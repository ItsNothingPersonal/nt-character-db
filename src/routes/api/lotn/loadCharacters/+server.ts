import HttpStatusCode from '$lib/httpStatusCode';
import {
	playerCharacterSelection,
	type PlayerCharacterSelection
} from '$lib/zod/lotn/types/playerCharacterSelection';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}

	let requestJson = {};
	const clone = request.clone();
	const text = await clone.text();

	if (text) {
		try {
			requestJson = JSON.parse(text);
		} catch (e) {
			error(HttpStatusCode.BAD_REQUEST, 'Invalid JSON in request body');
		}
	}

	const requestJsonParsed = z
		.object({ mode: z.enum(['self', 'all']).default('self') })
		.safeParse(requestJson);

	let characters: (PlayerCharacterSelection & { username: string })[] = [];

	if (requestJsonParsed.success) {
		try {
			const characterBaseResponse = await locals.pb
				.collection<
					PlayerCharacterSelection & {
						expand: { user: { username: string } };
					}
				>('lotn_player_character_base')
				.getFullList({
					fields: 'id, clan, status, name, expand.user.username, project',
					filter: `status='accepted' ${requestJsonParsed.data.mode === 'self' ? `&& user='${locals.user.id}'` : ''}`,
					expand: 'user'
				});
			characters = characterBaseResponse.map((e) => {
				return {
					id: e.id,
					name: e.name,
					clan: e.clan,
					status: e.status,
					username: e.expand.user.username,
					project: e.project
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
