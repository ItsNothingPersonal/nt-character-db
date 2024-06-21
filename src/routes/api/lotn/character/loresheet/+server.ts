import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerLoresheet,
	playerLoresheetRequestBodyDB,
	playerLoresheetUpdateRequestBody,
	type PlayerLoresheet,
	type PlayerLoresheetRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerLoresheet.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerLoresheetsDB = await locals.pb
		.collection('lotn_player_character_loresheet')
		.getFirstListItem<PlayerLoresheet>(`character_id='${id}'`)
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerLoresheetParsed = playerLoresheet.optional().safeParse(playerLoresheetsDB);

	if (playerLoresheetParsed.success) {
		return playerLoresheetParsed.data
			? json(playerLoresheetParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Loresheets in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerLoresheetCreateBodyParsed = playerLoresheetRequestBodyDB.safeParse(requestJson);

	if (playerLoresheetCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerLoresheetRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_loresheet')
				.create<PlayerLoresheetRequestBodyDB>({
					name: playerLoresheetCreateBodyParsed.data.name,
					values: playerLoresheetCreateBodyParsed.data.values,
					character_id: playerLoresheetCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerLoresheet.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerLoresheetCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerLoresheetUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_loresheet')
			.getFirstListItem<PlayerLoresheetRequestBodyDB>(
				`character_id='${updateBodyParsed.data.character_id}'`
			);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'ID nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerLoresheet;
		try {
			result = await locals.pb
				.collection('lotn_player_character_loresheet')
				.update<PlayerLoresheet>(oldDataDB.id, updateBodyParsed.data.updateData);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(playerLoresheet.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.warn(updateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
