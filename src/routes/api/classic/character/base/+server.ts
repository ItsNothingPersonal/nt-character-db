import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerCharacterBase,
	type PlayerCharacterBase
} from '$lib/zod/classic/playerCharacter/playerCharacterBase';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterBaseDB = await locals.pb
		.collection('classic_player_character')
		.getFirstListItem<PlayerCharacterBase>(`id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterBaseParsed = playerCharacterBase.safeParse(playerCharacterBaseDB);

	if (playerCharacterBaseParsed.success) {
		return json(playerCharacterBaseParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Basisdaten in Datenbank entsprichen nicht dem korrekten Schema'
		);
	}
}
