import HttpStatusCode from '$lib/server/httpStatusCode';
import { playerTechnique, type PlayerTechnique } from '$lib/zod/playerTechnique';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = url.searchParams.get('id');

	if (!id || id?.length === null || (id?.length && id.length <= 0)) {
		throw error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	// Daten aus DB laden
	const playerTechniquesDB = await locals.pb
		.collection('player_character_technique')
		.getFullList<PlayerTechnique>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerTechniquesParsed = playerTechnique.array().safeParse(playerTechniquesDB);
	if (playerTechniquesParsed.success) {
		return json(playerTechniquesParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Techniken in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
};
