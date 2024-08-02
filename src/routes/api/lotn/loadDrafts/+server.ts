import HttpStatusCode from '$lib/httpStatusCode';
import type { PlayerCharacterName } from '$lib/zod/lotn/playerCharacter/playerCharacterName.js';
import {
	playerCharacterSelection,
	type PlayerCharacterSelection
} from '$lib/zod/lotn/types/playerCharacterSelection';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function POST({ locals }) {
	let characters: PlayerCharacterSelection[] = [];
	try {
		const characterBaseResponse = await locals.pb
			.collection<
				PlayerCharacterSelection & {
					expand: { lotn_player_character_name_via_character_id: PlayerCharacterName };
				}
			>('lotn_player_character_base')
			.getFullList({
				fields: 'id, clan, status, expand.lotn_player_character_name_via_character_id.name',
				filter: "status!='accepted'",
				expand: 'lotn_player_character_name_via_character_id'
			});
		characters = characterBaseResponse.map((e) => {
			return {
				id: e.id,
				name: e.expand.lotn_player_character_name_via_character_id.name,
				clan: e.clan,
				status: e.status
			};
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

	return json(playerCharacterSelection.array().parse(characters));
}
