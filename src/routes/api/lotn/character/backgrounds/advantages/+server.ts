import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackgroundAdvantage,
	type PlayerBackgroundAdvantage
} from '$lib/zod/lotn/playerCharacter/playerBackgroundAdvantage';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsAdvantageDB = await locals.pb
		.collection('lotn_player_character_backgrounds_advantage')
		.getFullList<PlayerBackgroundAdvantage>({ filter: `background_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsAdvantageParsed = playerBackgroundAdvantage
		.array()
		.safeParse(playerBackgroundsAdvantageDB);

	if (playerBackgroundsAdvantageParsed.success) {
		return json(playerBackgroundsAdvantageParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Backgrounds-Advantage in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
