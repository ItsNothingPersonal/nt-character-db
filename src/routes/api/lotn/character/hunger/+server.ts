import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerHunger,
	playerHungerRequestBodyDB,
	playerHungerUpdateRequestBody,
	type PlayerHunger,
	type PlayerHungerRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHunger';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterHungerDB = await locals.pb
		.collection('lotn_player_character_hunger')
		.getFirstListItem<PlayerHunger>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHungerParsed = playerHunger.safeParse(playerCharacterHungerDB);

	if (playerCharacterHungerParsed.success) {
		return json(playerCharacterHungerParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Hunger in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerHungerCreateBodyParsed = playerHungerRequestBodyDB.safeParse(requestJson);

	if (playerHungerCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerHungerRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_hunger')
				.create<PlayerHungerRequestBodyDB>({
					value: playerHungerCreateBodyParsed.data.value,
					character_id: playerHungerCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerHunger.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerHungerCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerHungerUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_hunger')
			.getFirstListItem<PlayerHungerRequestBodyDB>(
				`character_id='${updateBodyParsed.data.character_id}'`
			);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'ID nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerHunger;
		try {
			result = await locals.pb
				.collection('lotn_player_character_hunger')
				.update<PlayerHunger>(oldDataDB.id, updateBodyParsed.data.updateData);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerHunger.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
