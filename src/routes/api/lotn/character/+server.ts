import HttpStatusCode from '$lib/httpStatusCode';
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
	type PlayerCharacter
} from '$lib/zod/lotn/playerCharacter/playerCharacter';
import {
	playerCharacterBase,
	playerCharacterBaseCreateRequestBody,
	playerCharacterBaseDeleteRequestBody,
	type PlayerCharacterBaseUpdateRequestBody
} from '$lib/zod/lotn/playerCharacter/playerCharacterBase';
import {
	playerCharacterName,
	playerCharacterNameRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerCharacterName.js';
import {
	playerDiscipline,
	playerDisciplineRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerDiscipline.js';
import {
	playerExperience,
	playerExperienceRequestBodyDB
} from '$lib/zod/lotn/playerCharacter/playerExperience.js';
import { playerFlaw, playerFlawRequestBodyDB } from '$lib/zod/lotn/playerCharacter/playerFlaw.js';
import {
	playerFormula,
	playerFormulaRequestBodyDB,
	type PlayerFormula
} from '$lib/zod/lotn/playerCharacter/playerFormula.js';
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
	playerItem,
	playerItemRequestBodyDB,
	type PlayerItem
} from '$lib/zod/lotn/playerCharacter/playerItem';
import {
	playerLoresheet,
	playerLoresheetRequestBodyDB,
	type PlayerLoresheet
} from '$lib/zod/lotn/playerCharacter/playerLoresheet.js';
import {
	playerMerit,
	playerMeritRequestBodyDB
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
import { idSchema } from '$lib/zod/lotn/util.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
	const id = validateIdParameter(url);

	// Daten aus DB laden
	const playerCharacterBaseDB = await fetch(`/api/lotn/character/base?id=${id}`);
	if (playerCharacterBaseDB.status !== HttpStatusCode.OK) {
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'LotN-Charakter konnte in Datenbank nicht gefunden werden'
		);
	}
	const playerCharacterDB: Partial<PlayerCharacter> = playerCharacterBase.parse(
		await playerCharacterBaseDB.json()
	);

	const playerCharacterNameDB = await fetch(`/api/lotn/character/name?id=${id}`);
	playerCharacterDB.name = playerCharacterName.parse(await playerCharacterNameDB.json()).name;

	const playerAttributeDB = await fetch(`/api/lotn/character/attributes?id=${id}`);
	playerCharacterDB.attributes = playerAttribute.parse(await playerAttributeDB.json());

	const playerSkillDB = await fetch(`/api/lotn/character/skills?id=${id}`);
	playerCharacterDB.skills = playerSkill.array().parse(await playerSkillDB.json());

	const playerDisciplineDB = await fetch(`/api/lotn/character/disciplines?id=${id}`);
	playerCharacterDB.disciplines = playerDiscipline.array().parse(await playerDisciplineDB.json());

	const playerMoralityDB = await fetch(`/api/lotn/character/morality?id=${id}`);
	playerCharacterDB.morality = playerMorality.array().parse(await playerMoralityDB.json());

	const playerFormulaDB = await fetch(`/api/lotn/character/formulas?id=${id}`);
	let formulas: PlayerFormula[] | undefined = undefined;
	if (playerFormulaDB.status === 200) {
		formulas = playerFormula.array().parse(await playerFormulaDB.json());
	}
	playerCharacterDB.formulas = formulas;

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
	playerCharacterDB.backgrounds = playerBackground
		.merge(idSchema)
		.array()
		.parse(await playerBackgroundDB.json());

	const playerLoresheetDB = await fetch(`/api/lotn/character/loresheet?id=${id}`);
	let loresheet: PlayerLoresheet | undefined = undefined;
	if (playerLoresheetDB.status === 200) {
		loresheet = playerLoresheet.optional().parse(await playerLoresheetDB.json());
	}
	playerCharacterDB.loresheet = loresheet;

	const playerMeritsDB = await fetch(`/api/lotn/character/merits?id=${id}`);
	if (playerMeritsDB.status === 200) {
		playerCharacterDB.merits = playerMerit
			.merge(idSchema)
			.array()
			.optional()
			.parse(await playerMeritsDB.json());
	} else {
		playerCharacterDB.merits = undefined;
	}

	const playerFlawsDB = await fetch(`/api/lotn/character/flaws?id=${id}`);
	if (playerFlawsDB.status === 200) {
		playerCharacterDB.flaws = playerFlaw
			.merge(idSchema)
			.array()
			.optional()
			.parse(await playerFlawsDB.json());
	} else {
		playerCharacterDB.flaws = undefined;
	}

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

	const playerItemDB = await fetch(`/api/lotn/character/items?id=${id}`);
	if (playerItemDB.status === 200) {
		playerCharacterDB.items = playerItem
			.merge(idSchema)
			.array()
			.optional()
			.parse(await playerItemDB.json());
	} else {
		playerCharacterDB.items = undefined;
	}

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
		error(HttpStatusCode.BAD_REQUEST, 'Der Requestbody ist nicht korrekt formatiert');
	}
	const baseRequestBody = playerCharacterBaseCreateRequestBody
		.omit({ name: true })
		.parse(requestJson);
	const playerCharacterBaseDB = await fetch(`/api/lotn/character/base`, {
		method: 'POST',
		body: JSON.stringify(baseRequestBody)
	});
	const baseResult = playerCharacterBase.parse(await playerCharacterBaseDB.json());

	const nameRequestBody = playerCharacterNameRequestBodyDB.parse({
		name: playerCharacterCreateBodyParsed.data.name,
		character_id: baseResult.id
	});
	const nameRequestBodyDB = await fetch(`/api/lotn/character/name`, {
		method: 'POST',
		body: JSON.stringify(nameRequestBody)
	});
	const nameResult = playerCharacterName.merge(idSchema).parse(await nameRequestBodyDB.json());
	const baseUpdateRequestBody: PlayerCharacterBaseUpdateRequestBody = {
		id: baseResult.id,
		updateData: {
			name: nameResult.id
		}
	};
	console.warn(JSON.stringify(baseUpdateRequestBody, undefined, 2));
	const res = await fetch('/api/lotn/character/base', {
		method: 'PUT',
		body: JSON.stringify(baseUpdateRequestBody)
	});
	console.warn(res.status);

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
	const skillsRequestBodyDB = await fetch(`/api/lotn/character/skills`, {
		method: 'POST',
		body: JSON.stringify(skillsRequestBody)
	});
	const skillsResult = playerSkill.array().parse(await skillsRequestBodyDB.json());

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
	const backgroundResult = playerBackground
		.merge(idSchema)
		.array()
		.parse(await backgroundRequestBodyDB.json());

	let formulasResult: PlayerFormula[] | undefined = undefined;
	if (
		playerCharacterCreateBodyParsed.data.formulas &&
		playerCharacterCreateBodyParsed.data.formulas.length > 0
	) {
		const formulasRequestBody = playerFormulaRequestBodyDB.parse({
			formulas: playerCharacterCreateBodyParsed.data.formulas,
			character_id: baseResult.id
		});
		const formulasRequestBodyDB = await fetch(`/api/lotn/character/formulas`, {
			method: 'POST',
			body: JSON.stringify(formulasRequestBody)
		});
		formulasResult = playerFormula.array().parse(await formulasRequestBodyDB.json());
	}

	let ceremoniesResult: OblivionCeremonyName[] | undefined = undefined;
	if (
		playerCharacterCreateBodyParsed.data.ceremonies &&
		playerCharacterCreateBodyParsed.data.ceremonies.length > 0
	) {
		const ceremoniesRequestBody = playerCeremonyRequestBodyDB.parse({
			ceremonies: playerCharacterCreateBodyParsed.data.ceremonies,
			character_id: baseResult.id
		});
		const ceremoniesRequestBodyDB = await fetch(`/api/lotn/character/ceremonies`, {
			method: 'POST',
			body: JSON.stringify(ceremoniesRequestBody)
		});
		ceremoniesResult = oblivionCeremonyName.array().parse(await ceremoniesRequestBodyDB.json());
	}

	let ritualsResult: BloodSorceryRitualName[] | undefined = undefined;
	if (
		playerCharacterCreateBodyParsed.data.rituals &&
		playerCharacterCreateBodyParsed.data.rituals.length > 0
	) {
		const ritualsRequestBody = playerRitualRequestBodyDB.parse({
			rituals: playerCharacterCreateBodyParsed.data.rituals,
			character_id: baseResult.id
		});
		const ritualsRequestBodyDB = await fetch(`/api/lotn/character/rituals`, {
			method: 'POST',
			body: JSON.stringify(ritualsRequestBody)
		});
		ritualsResult = bloodSorceryRitualName.array().parse(await ritualsRequestBodyDB.json());
	}

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
	const meritsResult = playerMerit
		.merge(idSchema)
		.array()
		.parse(await meritRequestBodyDB.json());

	const flawRequestBody = playerFlawRequestBodyDB.parse({
		flaws: playerCharacterCreateBodyParsed.data.flaws,
		character_id: baseResult.id
	});
	const flawRequestBodyDB = await fetch(`/api/lotn/character/flaws`, {
		method: 'POST',
		body: JSON.stringify(flawRequestBody)
	});
	const flawsResult = playerFlaw
		.merge(idSchema)
		.array()
		.parse(await flawRequestBodyDB.json());

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

	let itemsResult: PlayerItem[] | undefined = undefined;
	if (playerCharacterCreateBodyParsed.data.items) {
		const itemRequestBody = playerItemRequestBodyDB.parse({
			items: playerCharacterCreateBodyParsed.data.items,
			character_id: baseResult.id
		});
		const itemRequestBodyDB = await fetch(`/api/lotn/character/items`, {
			method: 'POST',
			body: JSON.stringify(itemRequestBody)
		});
		itemsResult = playerItem.array().parse(await itemRequestBodyDB.json());
	}

	const resultCharacter: PlayerCharacter = playerCharacter.parse({
		...baseResult,
		...{
			attributes: attributeResult,
			skills: skillsResult,
			disciplines: disciplineResult,
			morality: moralityResult,
			backgrounds: backgroundResult,
			formulas: formulasResult,
			ceremonies: ceremoniesResult,
			rituals: ritualsResult,
			hunger: hungerResult,
			health: healthResult,
			willpower: willpowerResult,
			humanity: humanityResult,
			merits: meritsResult,
			flaws: flawsResult,
			experience: experienceResult,
			loresheet: loresheetResult,
			items: itemsResult,
			name: nameResult.name
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
