import HttpStatusCode from '$lib/server/httpStatusCode';
import { validateIdParameter } from '$lib/server/util';
import {
	bloodSorceryRitualName,
	type BloodSorceryRitualName
} from '$lib/zod/lotn/enums/bloodSorceryRitualName';
import {
	oblivionCeremonyName,
	type OblivionCeremonyName
} from '$lib/zod/lotn/enums/oblivionCeremonyName.js';
import { playerAttribute } from '$lib/zod/lotn/playerCharacter/playerAttribute';
import { playerBackground } from '$lib/zod/lotn/playerCharacter/playerBackground.js';
import {
	playerCharacter,
	type PlayerCharacter
} from '$lib/zod/lotn/playerCharacter/playerCharacter';
import { playerCharacterBase } from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import { playerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline.js';
import { playerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience.js';
import { playerFlaw, type PlayerFlaw } from '$lib/zod/lotn/playerCharacter/playerFlaw.js';
import { playerHealth } from '$lib/zod/lotn/playerCharacter/playerHealth.js';
import { playerHumanity } from '$lib/zod/lotn/playerCharacter/playerHumanity.js';
import { playerHunger } from '$lib/zod/lotn/playerCharacter/playerHunger';
import {
	playerLoresheet,
	type PlayerLoresheet
} from '$lib/zod/lotn/playerCharacter/playerLoresheet.js';
import { playerMerit, type PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit.js';
import { playerMorality } from '$lib/zod/lotn/playerCharacter/playerMorality';
import { playerSkill } from '$lib/zod/lotn/playerCharacter/playerSkill';
import { playerStatus, type PlayerStatus } from '$lib/zod/lotn/playerCharacter/playerStatus';
import { playerWillpower } from '$lib/zod/lotn/playerCharacter/playerWillpower.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterBaseDB = await fetch(`/api/lotn/character/base?id=${id}`);
	const playerCharacterDB: Partial<PlayerCharacter> = playerCharacterBase.parse(
		await playerCharacterBaseDB.json()
	);

	const playerAttributeDB = await fetch(`/api/lotn/character/attributes?id=${id}`);
	playerCharacterDB.attributes = playerAttribute.parse(await playerAttributeDB.json());

	const playerSkillDB = await fetch(`/api/lotn/character/skills?id=${id}`);
	playerCharacterDB.skills = playerSkill.array().parse(await playerSkillDB.json());

	const playerDisciplineDB = await fetch(`/api/lotn/character/disciplines?id=${id}`);
	playerCharacterDB.discipline = playerDiscipline.array().parse(await playerDisciplineDB.json());

	const playerMoralityDB = await fetch(`/api/lotn/character/morality?id=${id}`);
	playerCharacterDB.morality = playerMorality.array().parse(await playerMoralityDB.json());

	const playerRitualsDB = await fetch(`/api/lotn/character/rituals?id=${id}`);
	let rituals: BloodSorceryRitualName[] | undefined = undefined;
	if (playerRitualsDB.status === 200) {
		rituals = bloodSorceryRitualName.array().parse(await playerRitualsDB.json());
	}
	playerCharacterDB.rituals = rituals;

	const playerCeremoniesDB = await fetch(`/api/lotn/character/ceremonies?id=${id}`);
	let ceremonies: OblivionCeremonyName[] | undefined = undefined;
	if (playerCeremoniesDB.status === 200) {
		ceremonies = oblivionCeremonyName.array().parse(await playerCeremoniesDB.json());
	}
	playerCharacterDB.ceremonies = ceremonies;

	const playerBackgroundDB = await fetch(`/api/lotn/character/backgrounds?id=${id}`);
	playerCharacterDB.backgrounds = playerBackground.array().parse(await playerBackgroundDB.json());

	const playerLoresheetDB = await fetch(`/api/lotn/character/loresheets?id=${id}`);
	let loresheet: PlayerLoresheet | undefined = undefined;
	if (playerLoresheetDB.status === 200) {
		loresheet = playerLoresheet.optional().parse(await playerLoresheetDB.json());
	}
	playerCharacterDB.loresheet = loresheet;

	const playerMeritsDB = await fetch(`/api/lotn/character/merits?id=${id}`);
	let merits: PlayerMerit[] | undefined = undefined;
	if (playerMeritsDB.status === 200) {
		merits = playerMerit
			.array()
			.optional()
			.parse(await playerMeritsDB.json());
	}
	playerCharacterDB.merits = merits;

	const playerFlawsDB = await fetch(`/api/lotn/character/flaws?id=${id}`);
	let flaws: PlayerFlaw[] | undefined = undefined;
	if (playerFlawsDB.status === 200) {
		flaws = playerFlaw
			.array()
			.optional()
			.parse(await playerFlawsDB.json());
	}
	playerCharacterDB.flaws = flaws;

	const playerHungerDB = await fetch(`/api/lotn/character/hunger?id=${id}`);
	playerCharacterDB.hunger = playerHunger.parse(await playerHungerDB.json());

	const playerHealthDB = await fetch(`/api/lotn/character/health?id=${id}`);
	playerCharacterDB.health = playerHealth.parse(await playerHealthDB.json());

	const playerWillpowerDB = await fetch(`/api/lotn/character/willpower?id=${id}`);
	playerCharacterDB.willpower = playerWillpower.parse(await playerWillpowerDB.json());

	const playerExperienceDB = await fetch(`/api/lotn/character/experience?id=${id}`);
	playerCharacterDB.experience = playerExperience.array().parse(await playerExperienceDB.json());

	const playerHumanityDB = await fetch(`/api/lotn/character/humanity?id=${id}`);
	playerCharacterDB.humanity = playerHumanity.parse(await playerHumanityDB.json());

	const playerStatusRes = await fetch(`/api/lotn/character/status?id=${id}`);
	let status: PlayerStatus[] | undefined = undefined;
	if (playerStatusRes.status === 200) {
		status = playerStatus
			.array()
			.optional()
			.parse(await playerStatusRes.json());
	}
	playerCharacterDB.characterStatus = status;

	// Daten-Schema validieren
	const playerCharacterParsed = playerCharacter.safeParse(playerCharacterDB);
	if (playerCharacterParsed.success) {
		// Parsen insgesamt erfolgreich
		return json(playerCharacterParsed.data);
	} else {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter in Datenbank entspricht nicht dem korrekten Schema'
		);
	}
}
