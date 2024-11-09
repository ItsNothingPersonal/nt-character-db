import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackground,
	playerBackgroundCreateRequestBodyDB,
	playerBackgroundUpdateRequestBody,
	type PlayerBackground,
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
import { idSchema } from '$lib/zod/lotn/util';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals, fetch }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDB = await locals.pb
		.collection('lotn_player_character_background')
		.getFullList<PlayerBackground>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsParsed = playerBackground
		.merge(idSchema)
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

		return json(playerBackground.merge(idSchema).array().nonempty().parse(updatedBackgrounds));
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
	const playerBackgroundCreateBodyParsed =
		playerBackgroundCreateRequestBodyDB.safeParse(requestJson);

	if (playerBackgroundCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: (PlayerBackgroundSingleRequestBodyDB & { id: string })[] = [];
		for (const background of playerBackgroundCreateBodyParsed.data.backgrounds) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_background')
					.create<PlayerBackgroundSingleRequestBodyDB & { id: string }>({
						...background,
						character_id: playerBackgroundCreateBodyParsed.data.character_id
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
				id: result.id,
				name: result.name,
				value: result.value,
				sphereOfInfluence: result.sphereOfInfluence,
				advantages: result.advantages,
				disadvantages: result.disadvantages
			};
		});

		return new Response(
			JSON.stringify(playerBackground.merge(idSchema).array().parse(returnResult)),
			{
				status: HttpStatusCode.OK
			}
		);
	} else {
		console.error(playerBackgroundCreateBodyParsed.error.issues);
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
			// Parsen insgesamt erfolgreich
			let result: PlayerBackgroundSingleRequestBodyDB & { id: string };
			try {
				const updateItemBodyDB = playerBackground.parse(updateItem);
				result = await locals.pb
					.collection('lotn_player_character_background')
					.update<
						PlayerBackgroundSingleRequestBodyDB & { id: string }
					>(updateItem.id, updateItemBodyDB);

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

		return new Response(
			JSON.stringify(playerBackground.merge(idSchema).array().parse(globalResult)),
			{
				status: HttpStatusCode.OK
			}
		);
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
