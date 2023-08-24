import HttpStatusCode from '$lib/server/httpStatusCode';
import { playerAttribute } from '$lib/zod/playerAttribute';
import { playerCharacter, type PlayerCharacter } from '$lib/zod/playerCharacter';
import { playerDiscipline } from '$lib/zod/playerDiscipline';
import { playerSkill } from '$lib/zod/playerSkill';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals, fetch }) => {
	const id = url.searchParams.get('id');

	if (!id || id?.length === null || (id?.length && id.length <= 0)) {
		throw error(HttpStatusCode.BAD_REQUEST, 'Keine ID vorhanden');
	}

	// Daten aus DB laden
	const playerCharacterDB = await locals.pb
		.collection('player_character')
		.getOne<PlayerCharacter>(id)
		.catch((e: { status: number; message: string }) => {
			throw error(e.status, e.message);
		});
	const playerAttributeDB = await fetch(`/api/character/attributes?id=${id}`);
	playerCharacterDB.attributes = playerAttribute.parse(await playerAttributeDB.json());

	const playerSkillsDB = await fetch(`/api/character/skills?id=${id}`);
	playerCharacterDB.skills = playerSkill.array().parse(await playerSkillsDB.json());

	const playerDisciplinesDB = await fetch(`/api/character/disciplines?id=${id}`);
	playerCharacterDB.disciplines = playerDiscipline.array().parse(await playerDisciplinesDB.json());

	// Daten-Schema validieren
	const playerCharacterParsed = playerCharacter.safeParse(playerCharacterDB);
	if (playerCharacterParsed.success) {
		// Parsen insgesamt erfolgreich
		return json(playerCharacterParsed.data);
	} else {
		throw error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
};
