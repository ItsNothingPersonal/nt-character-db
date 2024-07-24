import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerFlaw,
	playerFlawRequestBodyDB,
	playerFlawUpdateRequestBody,
	type PlayerFlaw,
	type PlayerFlawSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerFlaw.js';
import { idSchema } from '$lib/zod/lotn/util';

import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerFlawsDB = await locals.pb
		.collection('lotn_player_character_flaw')
		.getFullList<PlayerFlaw>({ filter: `character_id='${id}'` })
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerFlawsParsed = playerFlaw.merge(idSchema).array().optional().safeParse(playerFlawsDB);

	if (playerFlawsParsed.success) {
		return playerFlawsParsed.data && playerFlawsParsed.data.length > 0
			? json(playerFlawsParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Flaws in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerFlawCreateBodyParsed = playerFlawRequestBodyDB.safeParse(requestJson);

	if (playerFlawCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerFlawSingleRequestBodyDB[] = [];
		for (const flaw of playerFlawCreateBodyParsed.data.flaws) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_flaw')
					.create<PlayerFlawSingleRequestBodyDB>({
						...flaw,
						character_id: playerFlawCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerFlaw.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerFlawCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerFlawUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerFlaw[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			// Parsen insgesamt erfolgreich
			let result: PlayerFlaw;
			const updateItemServer = playerFlaw.parse(updateItem);
			try {
				result = await locals.pb
					.collection('lotn_player_character_flaw')
					.update<PlayerFlaw>(updateItem.id, updateItemServer);
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

		return new Response(JSON.stringify(playerFlaw.merge(idSchema).array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
