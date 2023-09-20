import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerBeastTraits, type PlayerBeastTraits } from '$lib/zod/playerBeastTraits';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBeastTraitsDB = await locals.pb
		.collection('player_character_beast_traits')
		.getFirstListItem<PlayerBeastTraits>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerBeastTraitsParsed = playerBeastTraits.safeParse(playerBeastTraitsDB);

	if (playerBeastTraitsParsed.success) {
		return json(playerBeastTraitsParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Beast-Traits in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
