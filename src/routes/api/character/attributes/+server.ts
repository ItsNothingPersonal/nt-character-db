import HttpStatusCode from '$lib/server/httpStatusCode';
import { playerAttribute, type PlayerAttribute } from '$lib/zod/playerAttribute';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = url.searchParams.get('id');

	if (!id || id?.length === null || (id?.length && id.length <= 0)) {
		throw error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	// Daten aus DB laden
	const playerAttributeDB = await locals.pb
		.collection('player_character_attribute')
		.getFirstListItem<PlayerAttribute>(`character_id='${id}'`);

	// Daten-Schema validieren
	const playerAttributeParsed = playerAttribute.safeParse(playerAttributeDB);

	if (playerAttributeParsed.success) {
		return json(playerAttributeParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter-Attribut in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
};
