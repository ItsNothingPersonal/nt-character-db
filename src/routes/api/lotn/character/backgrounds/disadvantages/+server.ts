import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackgroundDisadvantage,
	type PlayerBackgroundDisadvantage
} from '$lib/zod/lotn/playerCharacter/playerBackgroundDisdvantage';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDisadvantageDB = await locals.pb
		.collection('lotn_player_character_backgrounds_disadvantage')
		.getFullList<PlayerBackgroundDisadvantage>({ filter: `background_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsDisadvantageParsed = playerBackgroundDisadvantage
		.array()
		.safeParse(playerBackgroundsDisadvantageDB);

	if (playerBackgroundsDisadvantageParsed.success) {
		return json(playerBackgroundsDisadvantageParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Backgrounds-Disdvantage in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
