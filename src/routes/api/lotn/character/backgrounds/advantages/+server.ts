import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackgroundAdvantage,
	playerBackgroundAdvantageRequestBodyDB,
	playerBackgroundAdvantageUpdateRequestBody,
	type PlayerBackgroundAdvantage,
	type PlayerBackgroundAdvantageRequestBodyDB,
	type PlayerBackgroundAdvantageSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerBackgroundAdvantage';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsAdvantageDB = await locals.pb
		.collection('lotn_player_character_background_advantage')
		.getFullList<PlayerBackgroundAdvantage>({ filter: `background_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsAdvantageParsed = playerBackgroundAdvantage
		.array()
		.safeParse(playerBackgroundsAdvantageDB);

	if (playerBackgroundsAdvantageParsed.success) {
		return json(playerBackgroundsAdvantageParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Backgrounds-Advantage in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerBackgroundAdvantageCreateBodyParsed =
		playerBackgroundAdvantageRequestBodyDB.safeParse(requestJson);

	if (playerBackgroundAdvantageCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerBackgroundAdvantageSingleRequestBodyDB[] = [];
		for (const advantage of playerBackgroundAdvantageCreateBodyParsed.data.advantages) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_background_advantage')
					.create<PlayerBackgroundAdvantageSingleRequestBodyDB>({
						...advantage,
						background_id: playerBackgroundAdvantageCreateBodyParsed.data.background_id
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
		const returnResult: PlayerBackgroundAdvantage[] = globalResult.map((result) => {
			return {
				name: result.name,
				value: result.value
			};
		});

		return new Response(JSON.stringify(playerBackgroundAdvantage.array().parse(returnResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerBackgroundAdvantageCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerBackgroundAdvantageUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerBackgroundAdvantage[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			const oldDataDB = await locals.pb
				.collection('lotn_player_character_background_advantage')
				.getFirstListItem<PlayerBackgroundAdvantageRequestBodyDB>(
					`background_id='${updateBodyParsed.data.background_id}' && name='${updateItem.name}'`
				);

			if (!oldDataDB.id) {
				error(HttpStatusCode.BAD_REQUEST, 'Eintrag nicht gefunden');
			}

			// Parsen insgesamt erfolgreich
			let result: PlayerBackgroundAdvantage;
			try {
				result = await locals.pb
					.collection('lotn_player_character_background_advantage')
					.update<PlayerBackgroundAdvantage>(oldDataDB.id, updateItem);
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

		return new Response(JSON.stringify(playerBackgroundAdvantage.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
