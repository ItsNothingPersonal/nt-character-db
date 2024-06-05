import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerHumanity,
	type PlayerHumanity
} from '$lib/zod/lotn/playerCharacter/playerHumanity.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterHumanityDB = await locals.pb
		.collection('lotn_player_character_humanity')
		.getFirstListItem<PlayerHumanity>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHumanityParsed = playerHumanity.safeParse(playerCharacterHumanityDB);

	if (playerCharacterHumanityParsed.success) {
		return json(playerCharacterHumanityParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Humanity in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
