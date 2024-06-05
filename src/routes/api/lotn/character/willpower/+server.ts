import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerHunger } from '$lib/zod/lotn/playerCharacter/playerHunger';
import type { PlayerWillpower } from '$lib/zod/lotn/playerCharacter/playerWillpower.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterWillpowerDB = await locals.pb
		.collection('lotn_player_character_willpower')
		.getFirstListItem<PlayerWillpower>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterWillpowerParsed = playerHunger.safeParse(playerCharacterWillpowerDB);

	if (playerCharacterWillpowerParsed.success) {
		return json(playerCharacterWillpowerParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Willpower in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
