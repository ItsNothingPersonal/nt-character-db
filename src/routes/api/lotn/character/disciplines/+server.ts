import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import type { Discipline } from '$lib/zod/lotn/disciplines/discipline.js';
import {
	playerDiscipline,
	playerDisciplineRequestBodyDB,
	playerDisciplineUpdateRequestBody,
	type PlayerDiscipline,
	type PlayerDisciplineRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerDiscipline';

import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerDisciplinesDB = await locals.pb
		.collection('lotn_player_character_discipline')
		.getFullList<PlayerDiscipline>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerDisciplinesParsed = playerDiscipline
		.array()
		.nonempty()
		.safeParse(playerDisciplinesDB);

	if (playerDisciplinesParsed.success) {
		return json(playerDisciplinesParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Disziplinen in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerSkillCreateBodyParsed = playerDisciplineRequestBodyDB.safeParse(requestJson);

	if (playerSkillCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: Discipline[] = [];
		for (const discipline of playerSkillCreateBodyParsed.data.disciplines) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_discipline')
					.create<Discipline & { character_id: string; id?: string }>({
						...discipline,
						character_id: playerSkillCreateBodyParsed.data.character_id
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
		const returnResult: PlayerDiscipline[] = globalResult.map((result) => {
			return playerDiscipline.parse(result);
		});

		return new Response(JSON.stringify(playerDiscipline.array().parse(returnResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerSkillCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerDisciplineUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerDiscipline[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			const oldDataDB = await locals.pb
				.collection('lotn_player_character_discipline')
				.getFirstListItem<PlayerDisciplineRequestBodyDB>(
					`character_id='${updateBodyParsed.data.character_id}' && name='${updateItem.name}'`
				);

			if (!oldDataDB.id) {
				error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
			}

			// Parsen insgesamt erfolgreich
			let result: PlayerDiscipline;
			try {
				result = await locals.pb
					.collection('lotn_player_character_discipline')
					.update<PlayerDiscipline>(oldDataDB.id, updateItem);
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

		return new Response(JSON.stringify(playerDiscipline.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
