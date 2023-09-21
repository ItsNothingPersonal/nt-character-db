import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBeastTraitsServer,
	type PlayerBeastTraitsServer
} from '$lib/server/zod/playerBeastTraitsServer';
import { numberUpdateBody } from '$lib/zod/updateBody/numberUpdateBody';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ url, locals, request }) => {
	const id = validateIdParameter(url);
	const requestJson = await request.json();

	const numberUpdateParsed = numberUpdateBody.safeParse(requestJson);

	const playerBeastTraitsDB = await locals.pb
		.collection('player_character_beast_traits')
		.getFirstListItem<PlayerBeastTraitsServer>(`character_id='${id}'`);
	const playerBeastTraitsParsed = playerBeastTraitsServer.safeParse(playerBeastTraitsDB);

	if (numberUpdateParsed.success && playerBeastTraitsParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			await locals.pb
				.collection('player_character_beast_traits')
				.update(playerBeastTraitsParsed.data.id, {
					value: playerBeastTraitsParsed.data.value - numberUpdateParsed.data.value
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
};
