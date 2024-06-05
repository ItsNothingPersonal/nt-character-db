import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerCeremony,
	type PlayerCeremony
} from '$lib/zod/lotn/playerCharacter/playerCeremony.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCeremoniesDB = await locals.pb
		.collection('lotn_player_character_oblivion_ceremony')
		.getFirstListItem<PlayerCeremony>(`character_id='${id}'`)
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerCeremoniesParsed = playerCeremony.optional().safeParse(playerCeremoniesDB);

	if (playerCeremoniesParsed.success) {
		return playerCeremoniesParsed.data?.ceremonies &&
			playerCeremoniesParsed.data.ceremonies.length > 0
			? json(playerCeremoniesParsed.data.ceremonies)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Oblivion-Ceremonies in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
