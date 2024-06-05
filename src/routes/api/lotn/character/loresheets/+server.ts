import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerLoresheet,
	type PlayerLoresheet
} from '$lib/zod/lotn/playerCharacter/playerLoresheet.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerLoresheetsDB = await locals.pb
		.collection('lotn_player_character_loresheet')
		.getFirstListItem<PlayerLoresheet>(`character_id='${id}'`)
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerLoresheetParsed = playerLoresheet.optional().safeParse(playerLoresheetsDB);

	if (playerLoresheetParsed.success) {
		return playerLoresheetParsed.data
			? json(playerLoresheetParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Loresheets in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
