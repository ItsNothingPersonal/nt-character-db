import { updateHealth } from '$lib/lotn/updateHealth';
import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { damageUpdateBody } from '$lib/zod/classic/updateBody/damageUpdateBody';
import {
	playerHealthServer,
	type PlayerHealthServer
} from '$lib/zod/lotn/types/playerHealthServer';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ url, locals, request }) {
	const id = validateIdParameter(url);
	const requestJson = await request.json();

	const damageUpdateParsed = damageUpdateBody.safeParse(requestJson);

	const playerCharacterHealthDB = await locals.pb
		.collection('lotn_player_character_health')
		.getFirstListItem<PlayerHealthServer>(`character_id='${id}'`);

	const playerCharacterHealthParsed = playerHealthServer.safeParse(playerCharacterHealthDB);

	if (damageUpdateParsed.success && playerCharacterHealthParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			updateHealth(
				locals,
				playerCharacterHealthParsed.data.id,
				'add',
				damageUpdateParsed.data.damageType,
				playerCharacterHealthParsed.data.normal,
				playerCharacterHealthParsed.data.aggrevated,
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
