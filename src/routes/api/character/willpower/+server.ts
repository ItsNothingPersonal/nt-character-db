import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerWillpower, type PlayerWillpower } from '$lib/zod/playerCharacter/playerWillpower';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerWillpowerDB = await locals.pb
		.collection('player_character_willpower')
		.getFirstListItem<PlayerWillpower>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerWillpowerParsed = playerWillpower.safeParse(playerWillpowerDB);

	if (playerWillpowerParsed.success) {
		return json(playerWillpowerParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Willpower in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
