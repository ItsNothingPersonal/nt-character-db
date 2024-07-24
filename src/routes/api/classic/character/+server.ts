import HttpStatusCode from '$lib/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import { playerAttribute } from '$lib/zod/classic/playerCharacter/playerAttribute';
import { playerBackground } from '$lib/zod/classic/playerCharacter/playerBackground';
import { playerBeastTraits } from '$lib/zod/classic/playerCharacter/playerBeastTraits';
import { playerBlood } from '$lib/zod/classic/playerCharacter/playerBlood';
import {
	playerCharacter,
	type PlayerCharacter
} from '$lib/zod/classic/playerCharacter/playerCharacter';
import { playerCharacterBase } from '$lib/zod/classic/playerCharacter/playerCharacterBase';
import { playerDamageTaken } from '$lib/zod/classic/playerCharacter/playerDamageTaken';
import { playerDiscipline } from '$lib/zod/classic/playerCharacter/playerDiscipline';
import { playerExperience } from '$lib/zod/classic/playerCharacter/playerExperience';
import { playerFlaw } from '$lib/zod/classic/playerCharacter/playerFlaw';
import { playerItem } from '$lib/zod/classic/playerCharacter/playerItem';
import { playerMerit } from '$lib/zod/classic/playerCharacter/playerMerit';
import { playerMorality } from '$lib/zod/classic/playerCharacter/playerMorality';
import { playerSkill } from '$lib/zod/classic/playerCharacter/playerSkill';
import { playerTechnique } from '$lib/zod/classic/playerCharacter/playerTechnique';
import { playerWillpower } from '$lib/zod/classic/playerCharacter/playerWillpower';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterBaseDB = await fetch(`/api/classic/character/base?id=${id}`);
	const playerCharacterDB: Partial<PlayerCharacter> = playerCharacterBase.parse(
		await playerCharacterBaseDB.json()
	);

	const playerAttributeDB = await fetch(`/api/classic/character/attributes?id=${id}`);
	playerCharacterDB.attributes = playerAttribute.parse(await playerAttributeDB.json());

	const playerSkillsDB = await fetch(`/api/classic/character/skills?id=${id}`);
	playerCharacterDB.skills = playerSkill
		.array()
		.nonempty()
		.parse(await playerSkillsDB.json());

	const playerDisciplinesDB = await fetch(`/api/classic/character/disciplines?id=${id}`);
	playerCharacterDB.disciplines = playerDiscipline
		.array()
		.nonempty()
		.parse(await playerDisciplinesDB.json());

	const playerTechniquesDB = await fetch(`/api/classic/character/techniques?id=${id}`);
	playerCharacterDB.techniques = playerTechnique
		.array()
		.optional()
		.parse(await playerTechniquesDB.json());

	const playerMoralityDB = await fetch(`/api/classic/character/morality?id=${id}`);
	playerCharacterDB.morality = playerMorality.parse(await playerMoralityDB.json());

	const playerMeritsDB = await fetch(`/api/classic/character/merits?id=${id}`);
	playerCharacterDB.merits = playerMerit
		.array()
		.optional()
		.parse(await playerMeritsDB.json());

	const playerFlawsDB = await fetch(`/api/classic/character/flaws?id=${id}`);
	playerCharacterDB.flaws = playerFlaw
		.array()
		.optional()
		.parse(await playerFlawsDB.json());

	const playerBackgroundsDB = await fetch(`/api/classic/character/backgrounds?id=${id}`);
	playerCharacterDB.backgrounds = playerBackground
		.array()
		.nonempty()
		.parse(await playerBackgroundsDB.json());

	const playerItemsDB = await fetch(`/api/classic/character/items?id=${id}`);
	playerCharacterDB.items = playerItem
		.array()
		.optional()
		.parse(await playerItemsDB.json());

	const playerExperienceDB = await fetch(`/api/classic/character/experience?id=${id}`);
	playerCharacterDB.experience = playerExperience
		.array()
		.optional()
		.parse(await playerExperienceDB.json());

	const playerBloodDB = await fetch(`/api/classic/character/blood?id=${id}`);
	playerCharacterDB.blood = playerBlood.parse(await playerBloodDB.json());

	const playerWillpowerDB = await fetch(`/api/classic/character/willpower?id=${id}`);
	playerCharacterDB.willpower = playerWillpower.parse(await playerWillpowerDB.json());

	const playerDamageTakenDB = await fetch(`/api/classic/character/damageTaken?id=${id}`);
	playerCharacterDB.damageTaken = playerDamageTaken.parse(await playerDamageTakenDB.json());

	const playerBeastTraitsDB = await fetch(`/api/classic/character/beastTraits?id=${id}`);
	playerCharacterDB.beastTraits = playerBeastTraits.parse(await playerBeastTraitsDB.json());

	// Daten-Schema validieren
	const playerCharacterParsed = playerCharacter.safeParse(playerCharacterDB);
	if (playerCharacterParsed.success) {
		// Parsen insgesamt erfolgreich
		return json(playerCharacterParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Charakter in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
}
