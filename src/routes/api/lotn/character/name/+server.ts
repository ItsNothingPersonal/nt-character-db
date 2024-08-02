import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util.js';
import {
	playerCharacterName,
	playerCharacterNameRequestBodyDB,
	playerCharacterNameUpdateRequestBody,
	type PlayerCharacterName,
	type PlayerCharacterNameRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerCharacterName.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterNameDB = await locals.pb
		.collection('lotn_player_character_name')
		.getFirstListItem<PlayerCharacterName>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterNameParsed = playerCharacterName.safeParse(playerCharacterNameDB);

	if (playerCharacterNameParsed.success) {
		return json(playerCharacterNameParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Name in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerCharacterNameCreateBodyParsed =
		playerCharacterNameRequestBodyDB.safeParse(requestJson);

	if (playerCharacterNameCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerCharacterNameRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_name')
				.create<PlayerCharacterNameRequestBodyDB>({
					name: playerCharacterNameCreateBodyParsed.data.name,
					character_id: playerCharacterNameCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerCharacterName.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerCharacterNameCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerCharacterNameUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_name')
			.getFirstListItem<PlayerCharacterNameRequestBodyDB>(
				`character_id='${updateBodyParsed.data.character_id}'`
			);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'ID nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerCharacterName;
		try {
			result = await locals.pb
				.collection('lotn_player_character_name')
				.update<PlayerCharacterName>(oldDataDB.id, updateBodyParsed.data.updateData);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerCharacterName.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
