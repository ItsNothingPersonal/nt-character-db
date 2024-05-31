import HttpStatusCode from '$lib/server/httpStatusCode';
import type { PlayerCharacterSelection } from '$lib/zod/playerCharacterSelection/playerCharacterSelection.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ locals }) {
	let characters: PlayerCharacterSelection[] = [];

	try {
		characters = await locals.pb
			.collection<PlayerCharacterSelection>('player_character')
			.getFullList({ fields: 'id, name' });
	} catch (e) {
		if (e instanceof ClientResponseError) {
			error(HttpStatusCode.NOT_FOUND, `Charaktere konnten nicht geladen werden: ${e.message}`);
		}
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
		);
	}

	return json(characters);
}
