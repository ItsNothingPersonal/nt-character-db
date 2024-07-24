import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerItem,
	playerItemRequestBodyDB,
	playerItemUpdateRequestBody,
	type PlayerItem,
	type PlayerItemSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerItem';
import { idSchema } from '$lib/zod/lotn/util';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerItemsDB = await locals.pb
		.collection('lotn_player_character_item')
		.getFullList<PlayerItem>({ filter: `character_id='${id}'` })
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerItemParsed = playerItem.merge(idSchema).array().optional().safeParse(playerItemsDB);

	if (playerItemParsed.success) {
		return playerItemParsed.data && playerItemParsed.data.length > 0
			? json(playerItemParsed.data)
			: new Response(undefined, { status: HttpStatusCode.NO_CONTENT });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Items in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerItemCreateBodyParsed = playerItemRequestBodyDB.safeParse(requestJson);

	if (playerItemCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerItemSingleRequestBodyDB[] = [];
		for (const item of playerItemCreateBodyParsed.data.items) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_item')
					.create<PlayerItemSingleRequestBodyDB>({
						...item,
						character_id: playerItemCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerItem.merge(idSchema).array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerItemCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerItemUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const globalResult: PlayerItem[] = [];

		for (const updateItem of updateBodyParsed.data.updateData) {
			// Parsen insgesamt erfolgreich
			let result: PlayerItem;
			const updateItemServer = playerItem.parse(updateItem);
			try {
				result = await locals.pb
					.collection('lotn_player_character_item')
					.update<PlayerItem>(updateItem.id, updateItemServer);
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

		return new Response(JSON.stringify(playerItem.merge(idSchema).array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.warn(updateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
