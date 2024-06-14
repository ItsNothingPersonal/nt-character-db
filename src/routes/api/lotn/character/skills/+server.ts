import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	playerSkill,
	playerSkillRequestBodyDB,
	type PlayerSkill,
	type PlayerSkillSingleRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerSkill';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export async function GET({ url, locals }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerSkillsDB = await locals.pb
		.collection('lotn_player_character_skill')
		.getFullList<PlayerSkill>({ filter: `character_id='${id}'` });

	// Daten-Schema validieren
	const playerSkillsParsed = playerSkill.array().nonempty().safeParse(playerSkillsDB);

	if (playerSkillsParsed.success) {
		return json(playerSkillsParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter-Skills in Datenbank entsprechen nicht dem korrekten Schema'
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();
	const playerSkillCreateBodyParsed = playerSkillRequestBodyDB.safeParse(requestJson);

	if (playerSkillCreateBodyParsed.success) {
		// Parsen insgesamt erfolgreich
		const globalResult: PlayerSkillSingleRequestBodyDB[] = [];
		for (const skill of playerSkillCreateBodyParsed.data.skills) {
			try {
				const result = await locals.pb
					.collection('lotn_player_character_skill')
					.create<PlayerSkillSingleRequestBodyDB>({
						...skill,
						character_id: playerSkillCreateBodyParsed.data.character_id
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

		return new Response(JSON.stringify(playerSkill.array().parse(globalResult)), {
			status: HttpStatusCode.OK
		});
	} else {
		console.error(playerSkillCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
}
