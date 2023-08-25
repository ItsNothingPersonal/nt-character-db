import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerExperience, type PlayerExperience } from '$lib/zod/playerExperience';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerExperienceDB = await locals.pb
		.collection('player_character_experience')
		.getFullList<PlayerExperience>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerExperienceParsed = playerExperience.array().optional().safeParse(playerExperienceDB);

	if (playerExperienceParsed.success) {
		return json(playerExperienceParsed.data);
	} else {
		console.warn(playerExperienceParsed.error.message);
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Experience in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
