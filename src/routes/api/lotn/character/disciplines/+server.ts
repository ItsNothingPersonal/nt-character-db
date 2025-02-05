import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { parseUnknownError } from '$lib/util';
import type { Discipline } from '$lib/zod/lotn/disciplines/discipline';
import { disciplinePower, type DisciplinePower } from '$lib/zod/lotn/disciplines/disciplinePower';
import {
	playerDiscipline,
	playerDisciplineRequestBodyDB,
	playerDisciplineUpdateRequestBody,
	type PlayerDiscipline,
	type PlayerDisciplineRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerDiscipline';
import { type PlayerDisciplinePower } from '$lib/zod/lotn/playerCharacter/playerDisciplinePower';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerDisciplinesDB = await locals.pb
		.collection('lotn_player_character_discipline')
		.getFullList<
			PlayerDiscipline & {
				expand: {
					lotn_player_character_discipline_power_via_discipline_id: PlayerDisciplinePower[];
				};
			}
		>({
			filter: `character_id='${id}'`,
			expand: 'lotn_player_character_discipline_power_via_discipline_id'
		});

	playerDisciplinesDB.forEach((d) => {
		const powers = disciplinePower
			.array()
			.parse(d.expand?.lotn_player_character_discipline_power_via_discipline_id);
		d.powers = z.any().array().parse(powers);
	});

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
				const disciplineResult = await locals.pb
					.collection('lotn_player_character_discipline')
					.create<Omit<Discipline, 'powers'> & { character_id: string; id: string }>({
						...discipline,
						character_id: playerSkillCreateBodyParsed.data.character_id
					});

				const powerResults: (DisciplinePower & { discipline_id: string; id: string })[] = [];
				for (const power of discipline.powers) {
					try {
						const result = await locals.pb
							.collection('lotn_player_character_discipline_power')
							.create<DisciplinePower & { discipline_id: string; id: string }>({
								...power,
								discipline_id: disciplineResult.id
							});
						powerResults.push(result);
					} catch (e) {
						if (e instanceof ClientResponseError) {
							error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Failed to create power: ${e.message}`);
						} else {
							error(
								HttpStatusCode.INTERNAL_SERVER_ERROR,
								`Unknown error occurred: ${JSON.stringify(parseUnknownError(e))}`
							);
						}
					}
				}

				const disciplineCreated: Discipline = {
					...disciplineResult,
					powers: powerResults
				};

				globalResult.push(disciplineCreated);
			} catch (e) {
				if (e instanceof ClientResponseError) {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Datenbankupdate fehlgeschlagen: ${e.message}`
					);
				} else {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Unbekannter Fehler aufgetreten: ${JSON.stringify(parseUnknownError(e))}`
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

			const powersToDelete = await locals.pb
				.collection('lotn_player_character_discipline_power')
				.getFullList({ filter: `discipline_id='${oldDataDB.id}'` });
			powersToDelete.map(
				async (p) =>
					await locals.pb.collection('lotn_player_character_discipline_power').delete(p.id)
			);

			const powerResults: (DisciplinePower & { discipline_id: string; id: string })[] = [];
			for (const power of updateItem.powers) {
				try {
					const result = await locals.pb
						.collection('lotn_player_character_discipline_power')
						.create<DisciplinePower & { discipline_id: string; id: string }>({
							...power,
							discipline_id: oldDataDB.id
						});
					powerResults.push(result);
				} catch (e) {
					if (e instanceof ClientResponseError) {
						error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Failed to create power: ${e.message}`);
					} else {
						error(
							HttpStatusCode.INTERNAL_SERVER_ERROR,
							`Unknown error occurred: ${JSON.stringify(e)}`
						);
					}
				}
			}

			// Parsen insgesamt erfolgreich
			try {
				const result = await locals.pb
					.collection('lotn_player_character_discipline')
					.update<Discipline & { expand: { powers: PlayerDisciplinePower[] } }>(
						oldDataDB.id,
						{
							...updateItem,
							powers: powerResults.map((r) => r.id)
						},
						{ expand: 'powers' }
					);
				result.powers = result.expand.powers.map((p) => {
					return disciplinePower.parse(p);
				});
				globalResult.push(playerDiscipline.parse(result));
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
