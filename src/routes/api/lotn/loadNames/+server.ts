import HttpStatusCode from '$lib/httpStatusCode';
import {
	playerCharacterName,
	type PlayerCharacterName
} from '$lib/zod/lotn/playerCharacter/playerCharacterName';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

export async function GET({ locals }) {
	let response: (PlayerCharacterName & { character_id: string })[] = [];
	try {
		response = await locals.pb
			.collection<PlayerCharacterName & { character_id: string }>('lotn_player_character_name')
			.getFullList({
				fields: 'name, character_id'
			});
	} catch (e) {
		if (e instanceof ClientResponseError) {
			error(HttpStatusCode.NOT_FOUND, `Charaktere konnten nicht geladen werden: ${e.message}`);
		}
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
		);
	}

	return json(
		playerCharacterName
			.merge(z.object({ character_id: z.string() }))
			.array()
			.parse(response)
	);
}
