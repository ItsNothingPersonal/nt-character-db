import HttpStatusCode from '$lib/server/httpStatusCode';
import { updateDamage, validateIdParameter } from '$lib/server/util';
import {
	playerDamageTakenServer,
	type PlayerDamageTakenServer
} from '$lib/server/zod/playerDamageTakenServer';
import { damageUpdateBody } from '$lib/zod/updateBody/damageUpdateBody';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ url, locals, request }) => {
	const id = validateIdParameter(url);
	const requestJson = await request.json();

	const damageUpdateParsed = damageUpdateBody.safeParse(requestJson);

	const playerDamageTakenDB = await locals.pb
		.collection('player_character_damage_taken')
		.getFirstListItem<PlayerDamageTakenServer>(`character_id='${id}'`);
	const playerDamageTakenParsed = playerDamageTakenServer.safeParse(playerDamageTakenDB);

	if (damageUpdateParsed.success && playerDamageTakenParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			updateDamage(
				locals,
				playerDamageTakenParsed.data.id,
				'add',
				damageUpdateParsed.data.damageType,
				playerDamageTakenParsed.data.normal,
				playerDamageTakenParsed.data.aggrevated,
				damageUpdateParsed.data.value
			);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				throw error(
					HttpStatusCode.INTERNAL_SERVER_ERROR,
					`Datenbankupdate fehlgeschlagen: ${e.message}`
				);
			}
			throw error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(null, { status: HttpStatusCode.NO_CONTENT });
	} else {
		throw error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
};
