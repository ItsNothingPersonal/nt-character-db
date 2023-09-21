import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerBackground, type PlayerBackground } from '$lib/zod/playerCharacter/playerBackground';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDB = await locals.pb
		.collection('player_character_background')
		.getFullList<PlayerBackground>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsParsed = playerBackground
		.array()
		.nonempty()
		.safeParse(playerBackgroundsDB);

	if (playerBackgroundsParsed.success) {
		return json(playerBackgroundsParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Backgrounds in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
