import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerStatusDB, type PlayerStatusDB } from '$lib/zod/lotn/playerCharacter/playerStatus.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerStatusDBRaw = await locals.pb
		.collection('lotn_player_character_status')
		.getFullList<PlayerStatusDB>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerStatusParsed = playerStatusDB.array().safeParse(playerStatusDBRaw);

	if (playerStatusParsed.success) {
		return playerStatusParsed.data && playerStatusParsed.data.length > 0
			? json(playerStatusParsed.data)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Status in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
}
