import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackground,
	playerBackgroundRequestBodyDB,
	playerBackgroundUpdateRequestBody,
	type PlayerBackground,
	type PlayerBackgroundRequestBodyDB,
	type PlayerBackgroundSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerBackground';
import {
	playerBackgroundAdvantage,
	playerBackgroundAdvantageRequestBodyDB,
	playerBackgroundAdvantageUpdateRequestBody
} from '$lib/zod/lotn/playerCharacter/playerBackgroundAdvantage';
import {
	playerBackgroundDisadvantage,
	playerBackgroundDisadvantageRequestBodyDB,
	playerBackgroundDisadvantageUpdateRequestBody
} from '$lib/zod/lotn/playerCharacter/playerBackgroundDisdvantage.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

export async function GET({ url, locals, fetch }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDB = await locals.pb
		.collection('lotn_player_character_background')
		.getFullList<PlayerBackground>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsParsed = playerBackground
		.extend({ id: z.string() })
		.array()
		.nonempty()
		.safeParse(playerBackgroundsDB);

	if (playerBackgroundsParsed.success) {
		const updatedBackgrounds = await Promise.all(
			playerBackgroundsParsed.data.map(async (background) => {
				const playerBackgroundsAdvantageDB = await fetch(
					`/api/lotn/character/backgrounds/advantages?id=${background.id}`
				);
				const advantages = playerBackgroundAdvantage
					.array()
					.parse(await playerBackgroundsAdvantageDB.json());

				const playerBackgroundsDisadvantageDB = await fetch(
					`/api/lotn/character/backgrounds/disadvantages?id=${background.id}`
				);
				const disadvantages = playerBackgroundDisadvantage
					.array()
					.parse(await playerBackgroundsDisadvantageDB.json());

				return {
					...background,
					advantages: advantages.length > 0 ? advantages : undefined,
					disadvantages: disadvantages.length > 0 ? disadvantages : undefined
				};
			})
		);

		return json(playerBackground.array().nonempty().parse(updatedBackgrounds));
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Backgrounds in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request, fetch }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerMoralityCreateBodyParsed = playerBackgroundRequestBodyDB.safeParse(requestJson);

	if (playerMoralityCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerBackgroundSingleRequestBodyDB[] = [];
		for (const background of playerMoralityCreateBodyParsed.data.backgrounds) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_background')
					.create<PlayerBackgroundSingleRequestBodyDB>({
						...background,
						character_id: playerMoralityCreateBodyParsed.data.character_id
					});

				if (background.advantages && background.advantages.length > 0) {
					const backgroundsAdvantageRequestBody = playerBackgroundAdvantageRequestBodyDB.parse({
						advantages: background.advantages,
						background_id: result.id
					});
					const backgroundAdvantageRequestBodyDB = await fetch(
						`/api/lotn/character/backgrounds/advantages`,
						{
							method: 'POST',
							body: JSON.stringify(backgroundsAdvantageRequestBody)
						}
					);
					const backgroundAdvantageResult = playerBackgroundAdvantage
						.array()
						.parse(await backgroundAdvantageRequestBodyDB.json());

					result.advantages = backgroundAdvantageResult;
				}

				if (background.disadvantages && background.disadvantages.length > 0) {
					const backgroundsDisadvantageRequestBody =
						playerBackgroundDisadvantageRequestBodyDB.parse({
							disadvantages: background.disadvantages,
							background_id: result.id
						});
					const backgroundDisadvantageRequestBodyDB = await fetch(
						`/api/lotn/character/backgrounds/disadvantages`,
						{
							method: 'POST',
							body: JSON.stringify(backgroundsDisadvantageRequestBody)
						}
					);
					const backgroundDisadvantageResult = playerBackgroundDisadvantage
						.array()
						.parse(await backgroundDisadvantageRequestBodyDB.json());

					result.disadvantages = backgroundDisadvantageResult;
				}
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
		const returnResult: PlayerBackground[] = globalResult.map((result) => {
			return {
				name: result.name,
				value: result.value,
				sphereOfInfluence: result.sphereOfInfluence,
				advantages: result.advantages,
				disadvantages: result.disadvantages
			};
		});

		return new Response(JSON.stringify(playerBackground.array().parse(returnResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerMoralityCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request, fetch }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerBackgroundUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerBackground[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			const oldDataDB = await locals.pb
				.collection('lotn_player_character_background')
				.getFirstListItem<PlayerBackgroundRequestBodyDB>(
					`character_id='${updateBodyParsed.data.character_id}' && name='${updateItem.name}'`
				);

			if (!oldDataDB.id) {
				error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
			}

			// Parsen insgesamt erfolgreich
			let result: PlayerBackgroundSingleRequestBodyDB;
			try {
				result = await locals.pb
					.collection('lotn_player_character_background')
					.update<PlayerBackgroundSingleRequestBodyDB>(oldDataDB.id, updateItem);

				if (updateItem.advantages && updateItem.advantages.length > 0) {
					const backgroundAdvantageUpdateRequestBody =
						playerBackgroundAdvantageUpdateRequestBody.parse({
							updateData: updateItem.advantages,
							background_id: result.id
						});
					const backgroundAdvantageUpdateRequestBodyDB = await fetch(
						`/api/lotn/character/backgrounds/advantages`,
						{
							method: 'PUT',
							body: JSON.stringify(backgroundAdvantageUpdateRequestBody)
						}
					);
					const backgroundAdvantageUpdateResult = playerBackgroundAdvantage
						.array()
						.parse(await backgroundAdvantageUpdateRequestBodyDB.json());

					result.advantages = backgroundAdvantageUpdateResult;
				}

				if (updateItem.disadvantages && updateItem.disadvantages.length > 0) {
					const backgroundDisadvantageUpdateRequestBody =
						playerBackgroundDisadvantageUpdateRequestBody.parse({
							updateData: updateItem.disadvantages,
							background_id: result.id
						});
					const backgroundDisadvantageUpdateRequestBodyDB = await fetch(
						`/api/lotn/character/backgrounds/disadvantages`,
						{
							method: 'PUT',
							body: JSON.stringify(backgroundDisadvantageUpdateRequestBody)
						}
					);
					const backgroundDisadvantageUpdateResult = playerBackgroundDisadvantage
						.array()
						.parse(await backgroundDisadvantageUpdateRequestBodyDB.json());

					result.disadvantages = backgroundDisadvantageUpdateResult;
				}

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

		return new Response(JSON.stringify(playerBackground.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
