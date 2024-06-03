import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerDamageTaken,
	type PlayerDamageTaken
} from '$lib/zod/classic/playerCharacter/playerDamageTaken';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerDamageTakenDB = await locals.pb
		.collection('classic_player_character_damage_taken')
		.getFirstListItem<PlayerDamageTaken>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerDamageTakenParsed = playerDamageTaken.safeParse(playerDamageTakenDB);

	if (playerDamageTakenParsed.success) {
		return json(playerDamageTakenParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Damage-Taken in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
