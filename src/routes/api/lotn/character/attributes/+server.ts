import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerAttribute,
	type PlayerAttribute
} from '$lib/zod/lotn/playerCharacter/playerAttribute';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerAttributeDB = await locals.pb
		.collection('lotn_player_character_attribute')
		.getFirstListItem<PlayerAttribute>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerAttributeParsed = playerAttribute.safeParse(playerAttributeDB);

	if (playerAttributeParsed.success) {
		return json(playerAttributeParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LoTN-Charakter-Attribute in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
