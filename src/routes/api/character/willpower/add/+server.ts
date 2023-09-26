import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerWillpowerServer,
	type PlayerWillpowerServer
} from '$lib/server/zod/playerWillpowerServer';
import { numberUpdateBody } from '$lib/zod/updateBody/numberUpdateBody';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ url, locals, request }) {
	const id = validateIdParameter(url);
	const requestJson = await request.json();

	const numberUpdateParsed = numberUpdateBody.safeParse(requestJson);

	const playerWillpowerDB = await locals.pb
		.collection('player_character_willpower')
		.getFirstListItem<PlayerWillpowerServer>(`character_id='${id}'`);
	const playerWillpowerParsed = playerWillpowerServer.safeParse(playerWillpowerDB);

	if (numberUpdateParsed.success && playerWillpowerParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			await locals.pb
				.collection('player_character_willpower')
				.update(playerWillpowerParsed.data.id, {
					value: playerWillpowerParsed.data.value + numberUpdateParsed.data.value
				});
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
}
