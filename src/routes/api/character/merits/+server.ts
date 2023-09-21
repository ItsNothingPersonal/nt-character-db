import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerMerit, type PlayerMerit } from '$lib/zod/playerCharacter/playerMerit';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMeritsDB = await locals.pb
		.collection('player_character_merit')
		.getFullList<PlayerMerit>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerMeritsParsed = playerMerit.array().optional().safeParse(playerMeritsDB);

	if (playerMeritsParsed.success) {
		return json(playerMeritsParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Merits in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
