import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerMorality, type PlayerMorality } from '$lib/zod/playerMorality';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMoralityDB = await locals.pb
		.collection('player_character_morality')
		.getFirstListItem<PlayerMorality>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerMoralityParsed = playerMorality.safeParse(playerMoralityDB);

	if (playerMoralityParsed.success) {
		return json(playerMoralityParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Morality in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
};
