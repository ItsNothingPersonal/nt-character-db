import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerBloodServer, type PlayerBloodServer } from '$lib/server/zod/playerBloodServer';
import { numberUpdateBody } from '$lib/zod/updateBody/numberUpdateBody';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ url, locals, request }) {
	const id = validateIdParameter(url);
	const requestJson = await request.json();

	const numberUpdateParsed = numberUpdateBody.safeParse(requestJson);

	const playerBloodDB = await locals.pb
		.collection('player_character_blood')
		.getFirstListItem<PlayerBloodServer>(`character_id='${id}'`);
	const playerBloodParsed = playerBloodServer.safeParse(playerBloodDB);

	if (numberUpdateParsed.success && playerBloodParsed.success) {
		// Parsen insgesamt erfolgreich
		try {
			await locals.pb.collection('player_character_blood').update(playerBloodParsed.data.id, {
				value: playerBloodParsed.data.value + numberUpdateParsed.data.value
			});
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error(HttpStatusCode.INTERNAL_SERVER_ERROR, `Datenbankupdate fehlgeschlagen: ${e.message}`);
			}
			error(
				HttpStatusCode.INTERNAL_SERVER_ERROR,
				`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
			);
		}

		return new Response(null, { status: HttpStatusCode.NO_CONTENT });
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
