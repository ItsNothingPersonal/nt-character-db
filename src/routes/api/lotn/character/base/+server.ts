import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerCharacterBase,
	type PlayerCharacterBase
} from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);
	// Daten aus DB laden
	const playerCharacterBaseDB = await locals.pb
		.collection('lotn_player_character')
		.getFirstListItem<PlayerCharacterBase>(`id='${id}'`);

	// Daten-Schema validieren
	const playerCharacterBaseParsed = playerCharacterBase.safeParse(playerCharacterBaseDB);

	if (playerCharacterBaseParsed.success) {
		return json(playerCharacterBaseParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Basisdaten in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
