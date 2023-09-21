import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerFlaw, type PlayerFlaw } from '$lib/zod/playerCharacter/playerFlaw';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerFlawsDB = await locals.pb
		.collection('player_character_flaw')
		.getFullList<PlayerFlaw>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerFlawsParsed = playerFlaw.array().optional().safeParse(playerFlawsDB);

	if (playerFlawsParsed.success) {
		return json(playerFlawsParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Flaws in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
