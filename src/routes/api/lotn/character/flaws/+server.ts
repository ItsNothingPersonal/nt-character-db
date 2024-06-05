import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerFlaw, type PlayerFlaw } from '$lib/zod/lotn/playerCharacter/playerFlaw.js';

import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerFlawsDB = await locals.pb
		.collection('lotn_player_character_flaw')
		.getFullList<PlayerFlaw>({ filter: `character_id='${id}'` })
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerFlawsParsed = playerFlaw.array().optional().safeParse(playerFlawsDB);

	if (playerFlawsParsed.success) {
		return playerFlawsParsed.data && playerFlawsParsed.data.length > 0
			? json(playerFlawsParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Flaws in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
