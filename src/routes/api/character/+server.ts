import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerAttribute } from '$lib/zod/playerAttribute';
import { playerCharacter, type PlayerCharacter } from '$lib/zod/playerCharacter';
import { playerDiscipline } from '$lib/zod/playerDiscipline';
import { playerMorality } from '$lib/zod/playerMorality';
import { playerSkill } from '$lib/zod/playerSkill';
import { playerTechnique } from '$lib/zod/playerTechnique';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals, fetch }) => {
	const id = validateIdParameter(url);

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
	playerCharacterDB.skills = playerSkill
		.array()
		.nonempty()
		.parse(await playerSkillsDB.json());

	const playerDisciplinesDB = await fetch(`/api/character/disciplines?id=${id}`);
	playerCharacterDB.disciplines = playerDiscipline
		.array()
		.nonempty()
		.parse(await playerDisciplinesDB.json());

	const playerTechniquesDB = await fetch(`/api/character/techniques?id=${id}`);
	playerCharacterDB.techniques = playerTechnique
		.array()
		.optional()
		.parse(await playerTechniquesDB.json());

	const playerMoralityDB = await fetch(`/api/character/morality?id=${id}`);
	playerCharacterDB.morality = playerMorality.parse(await playerMoralityDB.json());

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
