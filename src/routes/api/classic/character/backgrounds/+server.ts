import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerBackground,
	type PlayerBackground
} from '$lib/zod/classic/playerCharacter/playerBackground';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerBackgroundsDB = await locals.pb
		.collection('classic_player_character_background')
		.getFullList<PlayerBackground>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerBackgroundsParsed = playerBackground
		.array()
		.nonempty()
		.safeParse(playerBackgroundsDB);

	if (playerBackgroundsParsed.success) {
		return json(playerBackgroundsParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Backgrounds in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
