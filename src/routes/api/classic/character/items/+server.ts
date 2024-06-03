import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerItem, type PlayerItem } from '$lib/zod/classic/playerCharacter/playerItem';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerItemsDB = await locals.pb
		.collection('classic_player_character_item')
		.getFullList<PlayerItem>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerItemsParsed = playerItem.array().optional().safeParse(playerItemsDB);

	if (playerItemsParsed.success) {
		return json(playerItemsParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Items in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
