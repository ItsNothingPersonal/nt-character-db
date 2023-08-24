import HttpStatusCode from '$lib/server/httpStatusCode';
import { playerDiscipline, type PlayerDiscipline } from '$lib/zod/playerDiscipline';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = url.searchParams.get('id');

	if (!id || id?.length === null || (id?.length && id.length <= 0)) {
		throw error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	// Daten aus DB laden
	const playerDisciplinesDB = await locals.pb
		.collection('player_character_discipline')
		.getFullList<PlayerDiscipline>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerDisciplinesParsed = playerDiscipline.array().safeParse(playerDisciplinesDB);
	if (playerDisciplinesParsed.success) {
		return json(playerDisciplinesParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Disziplinen in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
