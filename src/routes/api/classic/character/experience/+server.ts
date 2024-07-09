import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerExperience,
	type PlayerExperience
} from '$lib/zod/classic/playerCharacter/playerExperience';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerExperienceDB = await locals.pb
		.collection('classic_player_character_experience')
		.getFullList<PlayerExperience>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerExperienceParsed = playerExperience.array().optional().safeParse(playerExperienceDB);

	if (playerExperienceParsed.success) {
		return json(playerExperienceParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Experience in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
