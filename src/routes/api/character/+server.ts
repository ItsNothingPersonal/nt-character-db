import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerAttribute } from '$lib/zod/playerAttribute';
import { playerBackground } from '$lib/zod/playerBackground';
import { playerBlood } from '$lib/zod/playerBlood';
import { playerCharacter, type PlayerCharacter } from '$lib/zod/playerCharacter';
import { playerDamageTaken } from '$lib/zod/playerDamageTaken';
import { playerDiscipline } from '$lib/zod/playerDiscipline';
import { playerExperience } from '$lib/zod/playerExperience';
import { playerFlaw } from '$lib/zod/playerFlaw';
import { playerItem } from '$lib/zod/playerItem';
import { playerMerit } from '$lib/zod/playerMerit';
import { playerMorality } from '$lib/zod/playerMorality';
import { playerSkill } from '$lib/zod/playerSkill';
import { playerTechnique } from '$lib/zod/playerTechnique';
import { playerWillpower } from '$lib/zod/playerWillpower';
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

	const playerMeritsDB = await fetch(`/api/character/merits?id=${id}`);
	playerCharacterDB.merits = playerMerit
		.array()
		.optional()
		.parse(await playerMeritsDB.json());

	const playerFlawsDB = await fetch(`/api/character/flaws?id=${id}`);
	playerCharacterDB.flaws = playerFlaw
		.array()
		.optional()
		.parse(await playerFlawsDB.json());

	const playerBackgroundsDB = await fetch(`/api/character/backgrounds?id=${id}`);
	playerCharacterDB.backgrounds = playerBackground
		.array()
		.nonempty()
		.parse(await playerBackgroundsDB.json());

	const playerItemsDB = await fetch(`/api/character/items?id=${id}`);
	playerCharacterDB.items = playerItem
		.array()
		.optional()
		.parse(await playerItemsDB.json());

	const playerExperienceDB = await fetch(`/api/character/experience?id=${id}`);
	playerCharacterDB.experience = playerExperience
		.array()
		.optional()
		.parse(await playerExperienceDB.json());

	const playerBloodDB = await fetch(`/api/character/blood?id=${id}`);
	playerCharacterDB.blood = playerBlood.parse(await playerBloodDB.json());

	const playerWillpowerDB = await fetch(`/api/character/willpower?id=${id}`);
	playerCharacterDB.willpower = playerWillpower.parse(await playerWillpowerDB.json());

	const playerDamageTakenDB = await fetch(`/api/character/damageTaken?id=${id}`);
	playerCharacterDB.damageTaken = playerDamageTaken.parse(await playerDamageTakenDB.json());

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
