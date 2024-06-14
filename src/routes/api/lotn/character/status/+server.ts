import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerStatus,
	playerStatusRequestBodyDB,
	type PlayerStatus,
	type PlayerStatusDB
} from '$lib/zod/lotn/playerCharacter/playerStatus';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerStatusDBRaw = await locals.pb
		.collection('lotn_player_character_status')
		.getFullList<PlayerStatus>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerStatusParsed = playerStatus.array().optional().safeParse(playerStatusDBRaw);

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
