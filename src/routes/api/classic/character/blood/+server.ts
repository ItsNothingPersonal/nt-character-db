import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerBlood, type PlayerBlood } from '$lib/zod/classic/playerCharacter/playerBlood';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBloodDB = await locals.pb
		.collection('classic_player_character_blood')
		.getFirstListItem<PlayerBlood>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerBloodParsed = playerBlood.safeParse(playerBloodDB);

	if (playerBloodParsed.success) {
		return json(playerBloodParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Blood in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
