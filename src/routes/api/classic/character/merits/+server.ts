import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerMerit, type PlayerMerit } from '$lib/zod/classic/playerCharacter/playerMerit';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerMeritsDB = await locals.pb
		.collection('classic_player_character_merit')
		.getFullList<PlayerMerit>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerMeritsParsed = playerMerit.array().optional().safeParse(playerMeritsDB);

	if (playerMeritsParsed.success) {
		return json(playerMeritsParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Merits in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
