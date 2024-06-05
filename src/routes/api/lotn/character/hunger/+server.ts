import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerHunger, type PlayerHunger } from '$lib/zod/lotn/playerCharacter/playerHunger';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterHungerDB = await locals.pb
		.collection('lotn_player_character_hunger')
		.getFirstListItem<PlayerHunger>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHungerParsed = playerHunger.safeParse(playerCharacterHungerDB);

	if (playerCharacterHungerParsed.success) {
		return json(playerCharacterHungerParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Hunger in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
