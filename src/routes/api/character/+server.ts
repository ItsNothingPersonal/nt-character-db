import HttpStatusCode from '$lib/server/httpStatusCode';
import { playerCharacter } from '$lib/zod/playerCharacter';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const id = url.searchParams.get('id');

	if (!id || id?.length === null || (id?.length && id.length <= 0)) {
		throw error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	const record = await locals.pb
		.collection('player_character')
		.getOne(id)
		.catch((e: { status: number; message: string }) => {
			throw error(e.status, e.message);
		});

	const playerCharacterParsed = playerCharacter.safeParse(record);

	if (playerCharacterParsed.success) {
		return json(playerCharacterParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
};
