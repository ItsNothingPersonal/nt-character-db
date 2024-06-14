import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerCharacterBase,
	playerCharacterBaseCreateRequestBody,
	playerCharacterBaseCreateRequestBodyDB,
	playerCharacterBaseDeleteRequestBody,
	type PlayerCharacterBase,
	type PlayerCharacterBaseCreateRequestBody
} from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterBaseDB = await locals.pb
		.collection('lotn_player_character')
		.getFirstListItem<PlayerCharacterBase>(`id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterBaseParsed = playerCharacterBase.safeParse(playerCharacterBaseDB);

	if (playerCharacterBaseParsed.success) {
		return json(playerCharacterBaseParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Basisdaten in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerCharacterBaseCreateBodyParsed =
		playerCharacterBaseCreateRequestBody.safeParse(requestJson);

	if (playerCharacterBaseCreateBodyParsed.success) {
		const playerCharacterBaseCreateBodyParsedDB = playerCharacterBaseCreateRequestBodyDB.parse(
			playerCharacterBaseCreateBodyParsed.data
		);
		playerCharacterBaseCreateBodyParsedDB.user = locals.user.id;

		// Parsen insgesamt erfolgreich
		let result: PlayerCharacterBaseCreateRequestBody;
		try {
			result = await locals.pb
				.collection('lotn_player_character')
				.create<PlayerCharacterBaseCreateRequestBody>(playerCharacterBaseCreateBodyParsedDB);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerCharacterBaseCreateRequestBodyDB.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function DELETE({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerCharacterBaseDeleteBodyParsed =
		playerCharacterBaseDeleteRequestBody.safeParse(requestJson);

	if (playerCharacterBaseDeleteBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			await locals.pb
				.collection('lotn_player_character')
				.delete(playerCharacterBaseDeleteBodyParsed.data.id);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(undefined, {
			status: HttpStatusCode.NO_CONTENT
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
