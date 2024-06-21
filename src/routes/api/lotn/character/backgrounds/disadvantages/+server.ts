import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackgroundDisadvantage,
	playerBackgroundDisadvantageRequestBodyDB,
	playerBackgroundDisadvantageUpdateRequestBody,
	type PlayerBackgroundDisadvantage,
	type PlayerBackgroundDisadvantageRequestBodyDB,
	type PlayerBackgroundDisadvantageSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerBackgroundDisdvantage';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDisadvantageDB = await locals.pb
		.collection('lotn_player_character_background_disadvantage')
		.getFullList<PlayerBackgroundDisadvantage>({ filter: `background_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsDisadvantageParsed = playerBackgroundDisadvantage
		.array()
		.safeParse(playerBackgroundsDisadvantageDB);

	if (playerBackgroundsDisadvantageParsed.success) {
		return json(playerBackgroundsDisadvantageParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Backgrounds-Disdvantage in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerBackgroundDisadvantageCreateBodyParsed =
		playerBackgroundDisadvantageRequestBodyDB.safeParse(requestJson);

	if (playerBackgroundDisadvantageCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerBackgroundDisadvantageSingleRequestBodyDB[] = [];
		for (const disadvantage of playerBackgroundDisadvantageCreateBodyParsed.data.disadvantages) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_background_disadvantage')
					.create<PlayerBackgroundDisadvantageSingleRequestBodyDB>({
						...disadvantage,
						background_id: playerBackgroundDisadvantageCreateBodyParsed.data.background_id
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
		const returnResult: PlayerBackgroundDisadvantage[] = globalResult.map((result) => {
			return {
				name: result.name,
				value: result.value
			};
		});

		return new Response(JSON.stringify(playerBackgroundDisadvantage.array().parse(returnResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerBackgroundDisadvantageCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerBackgroundDisadvantageUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerBackgroundDisadvantage[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			const oldDataDB = await locals.pb
				.collection('lotn_player_character_background_disadvantage')
				.getFirstListItem<PlayerBackgroundDisadvantageRequestBodyDB>(
					`background_id='${updateBodyParsed.data.background_id}' && name='${updateItem.name}'`
				);

			if (!oldDataDB.id) {
				error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
			}

			// Parsen insgesamt erfolgreich
			let result: PlayerBackgroundDisadvantage;
			try {
				result = await locals.pb
					.collection('lotn_player_character_background_disadvantage')
					.update<PlayerBackgroundDisadvantage>(oldDataDB.id, updateItem);
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

		return new Response(JSON.stringify(playerBackgroundDisadvantage.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
