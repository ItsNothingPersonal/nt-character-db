import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerBlood, type PlayerBlood } from '$lib/zod/playerCharacter/playerBlood';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBloodDB = await locals.pb
		.collection('player_character_blood')
		.getFirstListItem<PlayerBlood>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerBloodParsed = playerBlood.safeParse(playerBloodDB);

	if (playerBloodParsed.success) {
		return json(playerBloodParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Blood in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
