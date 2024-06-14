import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerHealth,
	playerHealthRequestBodyDB,
	type PlayerHealth,
	type PlayerHealthRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHealth';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterHealthDB = await locals.pb
		.collection('lotn_player_character_health')
		.getFirstListItem<PlayerHealth>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHealthParsed = playerHealth.safeParse(playerCharacterHealthDB);

	if (playerCharacterHealthParsed.success) {
		return json(playerCharacterHealthParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Health in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerHealthCreateBodyParsed = playerHealthRequestBodyDB.safeParse(requestJson);

	if (playerHealthCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerHealthRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_health')
				.create<PlayerHealthRequestBodyDB>({
					normal: playerHealthCreateBodyParsed.data.normal,
					aggrevated: playerHealthCreateBodyParsed.data.aggrevated,
					character_id: playerHealthCreateBodyParsed.data.character_id
				});
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			} else {
				error(
					HttpStatusCode.INTERNAL_SERVER_ERROR,
					`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
				);
			}
		}

		return new Response(JSON.stringify(playerHealth.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerHealthCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
