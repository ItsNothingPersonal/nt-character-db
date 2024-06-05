import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerMorality, type PlayerMorality } from '$lib/zod/lotn/playerCharacter/playerMorality';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMoralityDB = await locals.pb
		.collection('lotn_player_character_morality')
		.getFullList<PlayerMorality>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerMoralityParsed = playerMorality.array().nonempty().safeParse(playerMoralityDB);

	if (playerMoralityParsed.success) {
		return json(playerMoralityParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Morality in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
