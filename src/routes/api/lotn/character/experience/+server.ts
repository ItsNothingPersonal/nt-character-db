import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerExperience,
	playerExperienceRequestBodyDB,
	type PlayerExperience,
	type PlayerExperienceSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerExperience';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerExperienceDB = await locals.pb
		.collection('lotn_player_character_experience')
		.getFullList<PlayerExperience>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerExperienceParsed = playerExperience.array().optional().safeParse(playerExperienceDB);

	if (playerExperienceParsed.success) {
		return json(playerExperienceParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Experience in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerExperienceCreateBodyParsed = playerExperienceRequestBodyDB.safeParse(requestJson);

	if (playerExperienceCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerExperienceSingleRequestBodyDB[] = [];
		for (const experience of playerExperienceCreateBodyParsed.data.experience) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_experience')
					.create<PlayerExperienceSingleRequestBodyDB>({
						...experience,
						character_id: playerExperienceCreateBodyParsed.data.character_id
					});
				globalResult.push(result);
			} catch (e) {
				if (e instanceof ClientResponseError) {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Datenbankupdate fehlgeschlagen: ${e.message}`
					);
				} else {
					error(
						HttpStatusCode.INTERNAL_SERVER_ERROR,
						`Unbekannter Fehler aufgetreten: ${JSON.stringify(e)}`
					);
				}
			}
		}

		return new Response(JSON.stringify(playerExperience.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerExperienceCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
