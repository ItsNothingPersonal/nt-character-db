import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerStatus,
	playerStatusRequestBodyDB,
	playerStatusUpdateRequestBody,
	type PlayerStatus,
	type PlayerStatusDB,
	type PlayerStatusRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerStatus';
import { idSchema } from '$lib/zod/lotn/util.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerStatusDBRaw = await locals.pb
		.collection('lotn_player_character_status')
		.getFullList<PlayerStatus>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerStatusParsed = playerStatus
		.merge(idSchema)
		.array()
		.optional()
		.safeParse(playerStatusDBRaw);

	if (playerStatusParsed.success) {
		return playerStatusParsed.data && playerStatusParsed.data.length > 0
			? json(playerStatusParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Status in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerStatusCreateBodyParsed = playerStatusRequestBodyDB.safeParse(requestJson);

	if (playerStatusCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerStatusDB[] = [];
		for (const status of playerStatusCreateBodyParsed.data.status ?? []) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_status')
					.create<PlayerStatusDB>({
						...status,
						character_id: playerStatusCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerStatus.array().optional().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerStatusCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerStatusUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerStatus[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			if (
				updateItem.opposition?.includes(updateBodyParsed.data.character_id) ||
				updateItem.support?.includes(updateBodyParsed.data.character_id)
			) {
				error(
					HttpStatusCode.BAD_REQUEST,
					`Ein Charakter kann sich nicht selbst Unterstützung oder Opposition geben!`
				);
			}

			const oldDataDB = await locals.pb
				.collection('lotn_player_character_status')
				.getFirstListItem<PlayerStatusRequestBodyDB>(
					`character_id='${updateBodyParsed.data.character_id}' && sect='${updateItem.sect}'`
				);

			if (!oldDataDB.id) {
				error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
			}

			// Parsen insgesamt erfolgreich
			let result: PlayerStatusDB;
			try {
				result = await locals.pb
					.collection('lotn_player_character_status')
					.update<PlayerStatusDB>(oldDataDB.id, updateItem);
				globalResult.push(playerStatus.parse(result));
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

		return new Response(JSON.stringify(playerStatus.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
