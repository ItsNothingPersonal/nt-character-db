import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { oblivionCeremonyName } from '$lib/zod/lotn/enums/oblivionCeremonyName.js';
import {
	playerCeremony,
	playerCeremonyRequestBodyDB,
	playerCeremonyUpdateRequestBody,
	type PlayerCeremony,
	type PlayerCeremonyRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerCeremony.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCeremoniesDB = await locals.pb
		.collection('lotn_player_character_oblivion_ceremony')
		.getFirstListItem<PlayerCeremony>(`character_id='${id}'`)
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerCeremoniesParsed = playerCeremony.optional().safeParse(playerCeremoniesDB);

	if (playerCeremoniesParsed.success) {
		return playerCeremoniesParsed.data?.ceremonies &&
			playerCeremoniesParsed.data.ceremonies.length > 0
			? json(playerCeremoniesParsed.data.ceremonies)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Oblivion-Ceremonies in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerCeremoniesCreateBodyParsed = playerCeremonyRequestBodyDB.safeParse(requestJson);

	if (playerCeremoniesCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		let result: PlayerCeremonyRequestBodyDB;
		try {
			result = await locals.pb
				.collection('lotn_player_character_oblivion_ceremony')
				.create<PlayerCeremonyRequestBodyDB>({
					ceremonies: playerCeremoniesCreateBodyParsed.data.ceremonies,
					character_id: playerCeremoniesCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(oblivionCeremonyName.array().parse(result.ceremonies)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerCeremoniesCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}

export async function PUT({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const updateBodyParsed = playerCeremonyUpdateRequestBody.safeParse(requestJson);

	if (updateBodyParsed.success) {
		const oldDataDB = await locals.pb
			.collection('lotn_player_character_oblivion_ceremony')
			.getFirstListItem<PlayerCeremonyRequestBodyDB>(
				`character_id='${updateBodyParsed.data.character_id}'`
			);

		if (!oldDataDB.id) {
			error(HttpStatusCode.BAD_REQUEST, 'ID nicht gefunden');
		}

		// Parsen insgesamt erfolgreich
		let result: PlayerCeremony;
		try {
			result = await locals.pb
				.collection('lotn_player_character_oblivion_ceremony')
				.update<PlayerCeremony>(oldDataDB.id, { ceremonies: updateBodyParsed.data.updateData });
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(JSON.stringify(oblivionCeremonyName.array().parse(result.ceremonies)), {
			status: HttpStatusCode.OK
		});
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
