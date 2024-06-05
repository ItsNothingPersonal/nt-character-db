import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerRitual, type PlayerRitual } from '$lib/zod/lotn/playerCharacter/playerRitual.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerRitualsDB = await locals.pb
		.collection('lotn_player_character_blood_sorcery_ritual')
		.getFirstListItem<PlayerRitual>(`character_id='${id}'`)
		.catch(() => {
			return undefined;
		});

	// Daten-Schema validieren
	const playerRitualsParsed = playerRitual.optional().safeParse(playerRitualsDB);

	if (playerRitualsParsed.success) {
		return playerRitualsParsed.data?.rituals && playerRitualsParsed.data?.rituals.length > 0
			? json(playerRitualsParsed.data.rituals)
			: new Response(undefined, { status: 204 });
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Blood-Sorcery-Rituals in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}
