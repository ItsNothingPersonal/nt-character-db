import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerAttribute,
	playerAttributeRequestBodyDB,
	type PlayerAttribute,
	type PlayerAttributeRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerAttribute';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerAttributeDB = await locals.pb
		.collection('lotn_player_character_attribute')
		.getFirstListItem<PlayerAttribute>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerAttributeParsed = playerAttribute.safeParse(playerAttributeDB);

	if (playerAttributeParsed.success) {
		return json(playerAttributeParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Attribute in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerAttributeCreateBodyParsed = playerAttributeRequestBodyDB.safeParse(requestJson);

	if (playerAttributeCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerAttributeRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_attribute')
				.create<PlayerAttributeRequestBodyDB>(playerAttributeCreateBodyParsed.data);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerAttributeRequestBodyDB.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
