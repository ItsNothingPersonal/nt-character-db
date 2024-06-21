import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerMerit,
	playerMeritRequestBodyDB,
	playerMeritUpdateRequestBody,
	type PlayerMerit,
	type PlayerMeritRequestBodyDB,
	type PlayerMeritSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerMerit.js';

import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMeritsDB = await locals.pb
		.collection('lotn_player_character_merit')
		.getFullList<PlayerMerit>({ filter: `character_id='${id}'` })
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerMeritsParsed = playerMerit.array().optional().safeParse(playerMeritsDB);

	if (playerMeritsParsed.success) {
		return playerMeritsParsed.data && playerMeritsParsed.data.length > 0
			? json(playerMeritsParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Merits in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerMeritCreateBodyParsed = playerMeritRequestBodyDB.safeParse(requestJson);

	if (playerMeritCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerMeritSingleRequestBodyDB[] = [];
		for (const merit of playerMeritCreateBodyParsed.data.merits) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_merit')
					.create<PlayerMeritSingleRequestBodyDB>({
						...merit,
						character_id: playerMeritCreateBodyParsed.data.character_id
					});
				globalResult.push(result);
			} catch (e) {
				if (e instanceof ClientResponseError) {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Datenbankupdate fehlgeschlagen: ${e.message}`
					);
				} else {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
					);
				}
			}
		}

		return new Response(JSON.stringify(playerMerit.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerMeritCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerMeritUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerMerit[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			const oldDataDB = await locals.pb
				.collection('lotn_player_character_merit')
				.getFirstListItem<PlayerMeritRequestBodyDB>(
					`character_id='${updateBodyParsed.data.character_id}' && name='${updateItem.name}'`
				);

			if (!oldDataDB.id) {
				error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
			}

			// Parsen insgesamt erfolgreich
			let result: PlayerMerit;
			try {
				result = await locals.pb
					.collection('lotn_player_character_merit')
					.update<PlayerMerit>(oldDataDB.id, updateItem);
				globalResult.push(result);
			} catch (e) {
				if (e instanceof ClientResponseError) {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Datenbankupdate fehlgeschlagen: ${e.message}`
					);
				}
				error(
					HttpStatusCode.INTERNAL_SERVER_ERROR,
					`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
				);
			}
		}

		return new Response(JSON.stringify(playerMerit.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
