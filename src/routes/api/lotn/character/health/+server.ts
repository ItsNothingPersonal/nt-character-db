import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerHealth, type PlayerHealth } from '$lib/zod/lotn/playerCharacter/playerHealth.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterHealthDB = await locals.pb
		.collection('lotn_player_character_health')
		.getFirstListItem<PlayerHealth>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterHealthParsed = playerHealth.safeParse(playerCharacterHealthDB);

	if (playerCharacterHealthParsed.success) {
		return json(playerCharacterHealthParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Health in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
