import HttpStatusCode from '$lib/server/httpStatusCode';
import { playerSkill, type PlayerSkill } from '$lib/zod/playerSkill';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = url.searchParams.get('id');

	if (!id || id?.length === null || (id?.length && id.length <= 0)) {
		throw error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	// Daten aus DB laden
	const playerSkillDB = await locals.pb
		.collection('player_character_skill')
		.getFullList<PlayerSkill>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerSkillParsed = playerSkill.array().safeParse(playerSkillDB);
	if (playerSkillParsed.success) {
		return json(playerSkillParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Skills in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
