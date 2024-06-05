import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerMerit, type PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit.js';

import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMeritsDB = await locals.pb
		.collection('lotn_player_character_merit')
		.getFullList<PlayerMerit>({ filter: `character_id='${id}'` })
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerMeritsParsed = playerMerit.array().optional().safeParse(playerMeritsDB);

	if (playerMeritsParsed.success) {
		return playerMeritsParsed.data && playerMeritsParsed.data.length > 0
			? json(playerMeritsParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Merits in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
