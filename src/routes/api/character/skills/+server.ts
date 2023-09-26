import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerSkill, type PlayerSkill } from '$lib/zod/playerCharacter/playerSkill';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerSkillsDB = await locals.pb
		.collection('player_character_skill')
		.getFullList<PlayerSkill>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerSkillsParsed = playerSkill.array().nonempty().safeParse(playerSkillsDB);

	if (playerSkillsParsed.success) {
		return json(playerSkillsParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Skills in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
