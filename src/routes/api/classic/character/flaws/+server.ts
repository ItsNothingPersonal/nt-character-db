import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerFlaw, type PlayerFlaw } from '$lib/zod/classic/playerCharacter/playerFlaw';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerFlawsDB = await locals.pb
		.collection('classic_player_character_flaw')
		.getFullList<PlayerFlaw>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerFlawsParsed = playerFlaw.array().optional().safeParse(playerFlawsDB);

	if (playerFlawsParsed.success) {
		return json(playerFlawsParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Flaws in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
