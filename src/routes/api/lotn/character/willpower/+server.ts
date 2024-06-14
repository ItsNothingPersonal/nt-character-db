import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerWillpower,
	playerWillpowerRequestBodyDB,
	type PlayerWillpower,
	type PlayerWillpowerRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerWillpower.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterWillpowerDB = await locals.pb
		.collection('lotn_player_character_willpower')
		.getFirstListItem<PlayerWillpower>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterWillpowerParsed = playerWillpower.safeParse(playerCharacterWillpowerDB);

	if (playerCharacterWillpowerParsed.success) {
		return json(playerCharacterWillpowerParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Willpower in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerWillpowerCreateBodyParsed = playerWillpowerRequestBodyDB.safeParse(requestJson);

	if (playerWillpowerCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerWillpowerRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_willpower')
				.create<PlayerWillpowerRequestBodyDB>({
					value: playerWillpowerCreateBodyParsed.data.value,
					character_id: playerWillpowerCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerWillpower.parse(result)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerWillpowerCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
