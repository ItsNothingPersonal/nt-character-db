import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerDiscipline, type PlayerDiscipline } from '$lib/zod/playerDiscipline';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerDisciplinesDB = await locals.pb
		.collection('player_character_discipline')
		.getFullList<PlayerDiscipline>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerDisciplinesParsed = playerDiscipline
		.array()
		.nonempty()
		.safeParse(playerDisciplinesDB);

	if (playerDisciplinesParsed.success) {
		return json(playerDisciplinesParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Disziplinen in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
