import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerTechnique, type PlayerTechnique } from '$lib/zod/playerCharacter/playerTechnique';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerTechniquesDB = await locals.pb
		.collection('player_character_technique')
		.getFullList<PlayerTechnique>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerTechniquesParsed = playerTechnique.array().optional().safeParse(playerTechniquesDB);
	if (playerTechniquesParsed.success) {
		return json(playerTechniquesParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Techniken in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
