import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerHumanity,
	playerHumanityRequestBodyDB,
	playerHumanityUpdateRequestBody,
	type PlayerHumanity,
	type PlayerHumanityRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHumanity.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterHumanityDB = await locals.pb
		.collection('lotn_player_character_humanity')
		.getFirstListItem<PlayerHumanity>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHumanityParsed = playerHumanity.safeParse(playerCharacterHumanityDB);

	if (playerCharacterHumanityParsed.success) {
		return json(playerCharacterHumanityParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Humanity in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerHumanityCreateBodyParsed = playerHumanityRequestBodyDB.safeParse(requestJson);

	if (playerHumanityCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerHumanityRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_humanity')
				.create<PlayerHumanityRequestBodyDB>({
					value: playerHumanityCreateBodyParsed.data.value,
					stains: playerHumanityCreateBodyParsed.data.stains,
					character_id: playerHumanityCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerHumanity.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerHumanityCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerHumanityUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_humanity')
			.getFirstListItem<PlayerHumanityRequestBodyDB>(
				`character_id='${updateBodyParsed.data.character_id}'`
			);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'ID nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerHumanity;
		try {
			result = await locals.pb
				.collection('lotn_player_character_humanity')
				.update<PlayerHumanity>(oldDataDB.id, updateBodyParsed.data.updateData);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerHumanity.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
