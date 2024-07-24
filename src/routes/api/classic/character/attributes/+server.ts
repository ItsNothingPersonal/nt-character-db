import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerAttribute,
	type PlayerAttribute
} from '$lib/zod/classic/playerCharacter/playerAttribute';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerAttributeDB = await locals.pb
		.collection('classic_player_character_attribute')
		.getFirstListItem<PlayerAttribute>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerAttributeParsed = playerAttribute.safeParse(playerAttributeDB);

	if (playerAttributeParsed.success) {
		return json(playerAttributeParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Attribut in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
}
