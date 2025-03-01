import HttpStatusCode from '$lib/httpStatusCode';
import {
	playerCharacterSelection,
	type PlayerCharacterSelection
} from '$lib/zod/lotn/types/playerCharacterSelection';
import { projectName } from '$lib/zod/projectName.js';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

export async function POST({ request, locals }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerCharacterBaseCreateBodyParsed = z
		.object({ project: projectName })
		.safeParse(requestJson);

	let characters: (PlayerCharacterSelection & { username: string })[] = [];

	if (playerCharacterBaseCreateBodyParsed.success) {
		try {
			const characterBaseResponse = await locals.pb
				.collection<
					PlayerCharacterSelection & {
						expand: { user: { username: string } };
					}
				>('lotn_player_character_base')
				.getFullList({
					fields: 'id, clan, status, name, expand.user.username',
					filter: `status='review' && project='${playerCharacterBaseCreateBodyParsed.data.project}'`,
					expand: 'user'
				});
			characters = characterBaseResponse.map((e) => {
				return {
					id: e.id,
					name: e.name,
					clan: e.clan,
					status: e.status,
					username: e.expand.user.username
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
	} else {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}

	return json(playerCharacterSelection.extend({ username: z.string() }).array().parse(characters));
}
