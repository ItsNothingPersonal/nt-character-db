import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { bloodSorceryRitualName } from '$lib/zod/lotn/enums/bloodSorceryRitualName.js';
import {
	playerRitual,
	playerRitualRequestBodyDB,
	playerRitualUpdateRequestBody,
	type PlayerRitual,
	type PlayerRitualRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerRitual.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerRitualsDB = await locals.pb
		.collection('lotn_player_character_blood_sorcery_ritual')
		.getFirstListItem<PlayerRitual>(`character_id='${id}'`)
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerRitualsParsed = playerRitual.optional().safeParse(playerRitualsDB);

	if (playerRitualsParsed.success) {
		return playerRitualsParsed.data?.rituals && playerRitualsParsed.data?.rituals.length > 0
			? json(playerRitualsParsed.data.rituals)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Blood-Sorcery-Rituals in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerRitualsCreateBodyParsed = playerRitualRequestBodyDB.safeParse(requestJson);

	if (playerRitualsCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerRitualRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_blood_sorcery_ritual')
				.create<PlayerRitualRequestBodyDB>({
					rituals: playerRitualsCreateBodyParsed.data.rituals,
					character_id: playerRitualsCreateBodyParsed.data.character_id
				});
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			} else {
				error(
					HttpStatusCode.INTERNAL_SERVER_ERROR,
					`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
				);
			}
		}

		return new Response(JSON.stringify(bloodSorceryRitualName.array().parse(result.rituals)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerRitualsCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerRitualUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_blood_sorcery_ritual')
			.getFirstListItem<PlayerRitualRequestBodyDB>(
				`character_id='${updateBodyParsed.data.character_id}'`
			);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'ID nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerRitual;
		try {
			result = await locals.pb
				.collection('lotn_player_character_blood_sorcery_ritual')
				.update<PlayerRitual>(oldDataDB.id, { rituals: updateBodyParsed.data.updateData });
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(bloodSorceryRitualName.array().parse(result.rituals)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
