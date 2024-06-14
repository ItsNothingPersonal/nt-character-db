import { updateHealth } from '$lib/lotn/updateHealth';
import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerHealthServer,
	type PlayerHealthServer
} from '$lib/zod/lotn/types/playerHealthServer';
import { damageUpdateBody } from '$lib/zod/lotn/updateBody/damageUpdateBody';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ url, locals, request }) {
	const id = validateIdParameter(url);
	const requestJson = await request.json();

	const damageUpdateParsed = damageUpdateBody.safeParse(requestJson);

	const playerDamageTakenDB = await locals.pb
		.collection('lotn_player_character_health')
		.getFirstListItem<PlayerHealthServer>(`character_id='${id}'`);
	const playerDamageTakenParsed = playerHealthServer.safeParse(playerDamageTakenDB);

	if (damageUpdateParsed.success && playerDamageTakenParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			updateHealth(
				locals,
				playerDamageTakenParsed.data.id,
				'substract',
				damageUpdateParsed.data.damageType,
				playerDamageTakenParsed.data.normal,
				playerDamageTakenParsed.data.aggrevated,
				damageUpdateParsed.data.value
			);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(undefined, { status: HttpStatusCode.NO_CONTENT });
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
