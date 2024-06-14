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
import {
	playerAttribute,
	playerAttributeRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerAttribute';
import {
	playerBackground,
	playerBackgroundRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerBackground.js';
import { playerCeremonyRequestBodyDB } from '$lib/zod/lotn/playerCharacter/playerCeremony';
import {
	playerCharacter,
	playerCharacterCreate,
	type PlayerCharacter,
	type PlayerCharacterCreate
} from '$lib/zod/lotn/playerCharacter/playerCharacter';
import {
	playerCharacterBase,
	playerCharacterBaseCreateRequestBody,
	playerCharacterBaseDeleteRequestBody
} from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import {
	playerDiscipline,
	playerDisciplineRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerDiscipline.js';
import {
	playerExperience,
	playerExperienceRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerExperience.js';
import {
	playerFlaw,
	playerFlawRequestBodyDB,
	type PlayerFlaw
} from '$lib/zod/lotn/playerCharacter/playerFlaw.js';
import {
	playerHealth,
	playerHealthRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHealth.js';
import {
	playerHumanity,
	playerHumanityRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHumanity.js';
import {
	playerHunger,
	playerHungerRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerHunger';
import {
	playerLoresheet,
	playerLoresheetRequestBodyDB,
	type PlayerLoresheet
} from '$lib/zod/lotn/playerCharacter/playerLoresheet.js';
import {
	playerMerit,
	playerMeritRequestBodyDB,
	type PlayerMerit
} from '$lib/zod/lotn/playerCharacter/playerMerit.js';
import {
	playerMorality,
	playerMoralityRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerMorality';
import { playerRitualRequestBodyDB } from '$lib/zod/lotn/playerCharacter/playerRitual';
import { playerSkill, playerSkillRequestBodyDB } from '$lib/zod/lotn/playerCharacter/playerSkill';
import { playerStatus, type PlayerStatus } from '$lib/zod/lotn/playerCharacter/playerStatus';
import {
	playerWillpower,
	playerWillpowerRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerWillpower.js';
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
	playerCharacterDB.disciplines = playerDiscipline.array().parse(await playerDisciplineDB.json());

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

	const playerLoresheetDB = await fetch(`/api/lotn/character/loresheet?id=${id}`);
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

export async function POST({ locals, request, fetch }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerCharacterCreateBodyParsed = playerCharacterCreate.safeParse(requestJson);

	if (!playerCharacterCreateBodyParsed.success) {
		console.warn(playerCharacterCreateBodyParsed.error.issues);
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}

	const baseRequestBody = playerCharacterBaseCreateRequestBody.parse(requestJson);
	const playerCharacterBaseDB = await fetch(`/api/lotn/character/base`, {
		method: 'POST',
		body: JSON.stringify(baseRequestBody)
	});
	const baseResult = playerCharacterBase.parse(await playerCharacterBaseDB.json());

	const attributesRequestBody = playerAttributeRequestBodyDB.parse({
		...playerCharacterCreateBodyParsed.data.attributes,
		character_id: baseResult.id
	});
	const attributesRequestBodyDB = await fetch(`/api/lotn/character/attributes`, {
		method: 'POST',
		body: JSON.stringify(attributesRequestBody)
	});
	const attributeResult = playerAttribute.parse(await attributesRequestBodyDB.json());

	const skillsRequestBody = playerSkillRequestBodyDB.parse({
		skills: playerCharacterCreateBodyParsed.data.skills,
		character_id: baseResult.id
	});
	const slkillsRequestBodyDB = await fetch(`/api/lotn/character/skills`, {
		method: 'POST',
		body: JSON.stringify(skillsRequestBody)
	});
	const skillsResult = playerSkill.array().parse(await slkillsRequestBodyDB.json());

	const disciplineRequestBody = playerDisciplineRequestBodyDB.parse({
		disciplines: playerCharacterCreateBodyParsed.data.disciplines,
		character_id: baseResult.id
	});
	const disciplineRequestBodyDB = await fetch(`/api/lotn/character/disciplines`, {
		method: 'POST',
		body: JSON.stringify(disciplineRequestBody)
	});
	const disciplineResult = playerDiscipline.array().parse(await disciplineRequestBodyDB.json());

	const moralityRequestBody = playerMoralityRequestBodyDB.parse({
		morality: playerCharacterCreateBodyParsed.data.morality,
		character_id: baseResult.id
	});
	const moraltiyRequestBodyDB = await fetch(`/api/lotn/character/morality`, {
		method: 'POST',
		body: JSON.stringify(moralityRequestBody)
	});
	const moralityResult = playerMorality.array().parse(await moraltiyRequestBodyDB.json());

	const backgroundsRequestBody = playerBackgroundRequestBodyDB.parse({
		backgrounds: playerCharacterCreateBodyParsed.data.backgrounds,
		character_id: baseResult.id
	});
	const backgroundRequestBodyDB = await fetch(`/api/lotn/character/backgrounds`, {
		method: 'POST',
		body: JSON.stringify(backgroundsRequestBody)
	});
	const backgroundResult = playerBackground.array().parse(await backgroundRequestBodyDB.json());

	const ceremoniesRequestBody = playerCeremonyRequestBodyDB.parse({
		ceremonies: playerCharacterCreateBodyParsed.data.ceremonies,
		character_id: baseResult.id
	});
	const ceremoniesRequestBodyDB = await fetch(`/api/lotn/character/ceremonies`, {
		method: 'POST',
		body: JSON.stringify(ceremoniesRequestBody)
	});
	const ceremoniesResult = oblivionCeremonyName.array().parse(await ceremoniesRequestBodyDB.json());

	const ritualsRequestBody = playerRitualRequestBodyDB.parse({
		rituals: playerCharacterCreateBodyParsed.data.rituals,
		character_id: baseResult.id
	});
	const ritualsRequestBodyDB = await fetch(`/api/lotn/character/rituals`, {
		method: 'POST',
		body: JSON.stringify(ritualsRequestBody)
	});
	const ritualsResult = bloodSorceryRitualName.array().parse(await ritualsRequestBodyDB.json());

	const hungerRequestBody = playerHungerRequestBodyDB.parse({
		value: playerCharacterCreateBodyParsed.data.hunger.value,
		character_id: baseResult.id
	});
	const hungerRequestBodyDB = await fetch(`/api/lotn/character/hunger`, {
		method: 'POST',
		body: JSON.stringify(hungerRequestBody)
	});
	const hungerResult = playerHunger.parse(await hungerRequestBodyDB.json());

	const healthRequestBody = playerHealthRequestBodyDB.parse({
		normal: playerCharacterCreateBodyParsed.data.health.normal,
		aggrevated: playerCharacterCreateBodyParsed.data.health.aggrevated,
		character_id: baseResult.id
	});
	const healthRequestBodyDB = await fetch(`/api/lotn/character/health`, {
		method: 'POST',
		body: JSON.stringify(healthRequestBody)
	});
	const healthResult = playerHealth.parse(await healthRequestBodyDB.json());

	const willpowerRequestBody = playerWillpowerRequestBodyDB.parse({
		value: playerCharacterCreateBodyParsed.data.willpower.value,
		character_id: baseResult.id
	});
	const willpowerRequestBodyDB = await fetch(`/api/lotn/character/willpower`, {
		method: 'POST',
		body: JSON.stringify(willpowerRequestBody)
	});
	const willpowerResult = playerWillpower.parse(await willpowerRequestBodyDB.json());

	const humanityRequestBody = playerHumanityRequestBodyDB.parse({
		value: playerCharacterCreateBodyParsed.data.humanity.value,
		stains: playerCharacterCreateBodyParsed.data.humanity.stains,
		character_id: baseResult.id
	});
	const humanityRequestBodyDB = await fetch(`/api/lotn/character/humanity`, {
		method: 'POST',
		body: JSON.stringify(humanityRequestBody)
	});
	const humanityResult = playerHealth.parse(await humanityRequestBodyDB.json());

	const meritRequestBody = playerMeritRequestBodyDB.parse({
		merits: playerCharacterCreateBodyParsed.data.merits,
		character_id: baseResult.id
	});
	const meritRequestBodyDB = await fetch(`/api/lotn/character/merits`, {
		method: 'POST',
		body: JSON.stringify(meritRequestBody)
	});
	const meritsResult = playerMerit.array().parse(await meritRequestBodyDB.json());

	const flawRequestBody = playerFlawRequestBodyDB.parse({
		flaws: playerCharacterCreateBodyParsed.data.flaws,
		character_id: baseResult.id
	});
	const flawRequestBodyDB = await fetch(`/api/lotn/character/flaws`, {
		method: 'POST',
		body: JSON.stringify(flawRequestBody)
	});
	const flawsResult = playerFlaw.array().parse(await flawRequestBodyDB.json());

	const experienceRequestBody = playerExperienceRequestBodyDB.parse({
		experience: playerCharacterCreateBodyParsed.data.experience,
		character_id: baseResult.id
	});
	const experienceRequestBodyDB = await fetch(`/api/lotn/character/experience`, {
		method: 'POST',
		body: JSON.stringify(experienceRequestBody)
	});
	const experienceResult = playerExperience.array().parse(await experienceRequestBodyDB.json());

	let loresheetResult: PlayerLoresheet | undefined = undefined;
	if (playerCharacterCreateBodyParsed.data.loresheet) {
		const loresheetRequestBody = playerLoresheetRequestBodyDB.parse({
			name: playerCharacterCreateBodyParsed.data.loresheet?.name,
			values: playerCharacterCreateBodyParsed.data.loresheet?.values,
			character_id: baseResult.id
		});
		const loresheetRequestBodyDB = await fetch(`/api/lotn/character/loresheet`, {
			method: 'POST',
			body: JSON.stringify(loresheetRequestBody)
		});
		loresheetResult = playerLoresheet.parse(await loresheetRequestBodyDB.json());
	}

	const resultCharacter: PlayerCharacterCreate = playerCharacterCreate.parse({
		...baseResult,
		...{
			attributes: attributeResult,
			skills: skillsResult,
			disciplines: disciplineResult,
			morality: moralityResult,
			backgrounds: backgroundResult,
			ceremonies: ceremoniesResult,
			rituals: ritualsResult,
			hunger: hungerResult,
			health: healthResult,
			willpower: willpowerResult,
			humanity: humanityResult,
			merits: meritsResult,
			flaws: flawsResult,
			experience: experienceResult,
			loresheet: loresheetResult
		}
	});

	return json(resultCharacter);
}

export async function DELETE({ locals, request, fetch }) {
	if (!locals.user) {
		error(HttpStatusCode.UNAUTHORIZED, 'Nicht eingeloggt');
	}
	const requestJson = await request.json();

	const playerCharacterDeleteBodyParsed =
		playerCharacterBaseDeleteRequestBody.safeParse(requestJson);

	if (!playerCharacterDeleteBodyParsed.success) {
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}

	await fetch(`/api/lotn/character/base`, {
		method: 'DELETE',
		body: JSON.stringify(playerCharacterDeleteBodyParsed.data)
	});

	return new Response(undefined, {
		status: HttpStatusCode.NO_CONTENT
	});
}
