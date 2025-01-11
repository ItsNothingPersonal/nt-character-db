import HttpStatusCode from '$lib/httpStatusCode';
import { fetchWithCatch, parseJson, validateIdParameter, writeToDb } from '$lib/server/util';
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
import { playerItem, playerItemRequestBodyDB } from '$lib/zod/lotn/playerCharacter/playerItem';
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

	// Daten aus DB laden
	const [
		playerAttributeDB,
		playerSkillDB,
		playerDisciplineDB,
		playerMoralityDB,
		playerFormulaDB,
		playerRitualsDB,
		playerCeremoniesDB,
		playerBackgroundDB,
		playerLoresheetDB,
		playerMeritsDB,
		playerFlawsDB,
		playerHungerDB,
		playerHealthDB,
		playerWillpowerDB,
		playerExperienceDB,
		playerHumanityDB,
		playerItemDB,
		playerStatusRes
	] = await Promise.all([
		fetchWithCatch(`/api/lotn/character/attributes?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/skills?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/disciplines?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/morality?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/formulas?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/rituals?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/ceremonies?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/backgrounds?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/loresheet?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/merits?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/flaws?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/hunger?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/health?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/willpower?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/experience?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/humanity?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/items?id=${id}`, fetch),
		fetchWithCatch(`/api/lotn/character/status?id=${id}`, fetch)
	]);

	// JSON parsen
	const [
		playerAttributes,
		playerSkills,
		playerDisciplines,
		playerMoralityJSON,
		playerFormulas,
		playerRituals,
		playerCeremonies,
		playerBackgrounds,
		playerLoresheetJSON,
		playerMerits,
		playerFlaws,
		playerHungerJSON,
		playerHealthJSON,
		playerWillpowerJSON,
		playerExperienceJSON,
		playerHumanityJSON,
		playerItems,
		playerStatusJSON
	] = await Promise.all([
		parseJson(playerAttributeDB),
		parseJson(playerSkillDB),
		parseJson(playerDisciplineDB),
		parseJson(playerMoralityDB),
		parseJson(playerFormulaDB),
		parseJson(playerRitualsDB),
		parseJson(playerCeremoniesDB),
		parseJson(playerBackgroundDB),
		parseJson(playerLoresheetDB),
		parseJson(playerMeritsDB),
		parseJson(playerFlawsDB),
		parseJson(playerHungerDB),
		parseJson(playerHealthDB),
		parseJson(playerWillpowerDB),
		parseJson(playerExperienceDB),
		parseJson(playerHumanityDB),
		parseJson(playerItemDB),
		parseJson(playerStatusRes)
	]);

	// Daten in Struktur parsen
	playerCharacterDB.attributes = playerAttribute.parse(playerAttributes);
	playerCharacterDB.skills = playerSkill.array().parse(playerSkills);
	playerCharacterDB.disciplines = playerDiscipline.array().parse(playerDisciplines);
	playerCharacterDB.morality = playerMorality.array().parse(playerMoralityJSON);

	let formulas: PlayerFormula[] | undefined = undefined;
	if (playerFormulaDB?.status === 200) {
		formulas = playerFormula.array().parse(playerFormulas);
	}
	playerCharacterDB.formulas = formulas;

	let rituals: BloodSorceryRitualName[] | undefined = undefined;
	if (playerRitualsDB?.status === 200) {
		rituals = bloodSorceryRitualName.array().parse(playerRituals);
	}
	playerCharacterDB.rituals = rituals;

	let ceremonies: OblivionCeremonyName[] | undefined = undefined;
	if (playerCeremoniesDB?.status === 200) {
		ceremonies = oblivionCeremonyName.array().parse(playerCeremonies);
	}
	playerCharacterDB.ceremonies = ceremonies;

	playerCharacterDB.backgrounds = playerBackground.merge(idSchema).array().parse(playerBackgrounds);

	let loresheet: PlayerLoresheet | undefined = undefined;
	if (playerLoresheetDB?.status === 200) {
		loresheet = playerLoresheet.optional().parse(playerLoresheetJSON);
	}
	playerCharacterDB.loresheet = loresheet;

	if (playerMeritsDB?.status === 200) {
		playerCharacterDB.merits = playerMerit.merge(idSchema).array().optional().parse(playerMerits);
	} else {
		playerCharacterDB.merits = undefined;
	}

	if (playerFlawsDB?.status === 200) {
		playerCharacterDB.flaws = playerFlaw.merge(idSchema).array().optional().parse(playerFlaws);
	} else {
		playerCharacterDB.flaws = undefined;
	}

	playerCharacterDB.hunger = playerHunger.parse(playerHungerJSON);
	playerCharacterDB.health = playerHealth.parse(playerHealthJSON);
	playerCharacterDB.willpower = playerWillpower.parse(playerWillpowerJSON);
	playerCharacterDB.experience = playerExperience.array().parse(playerExperienceJSON);
	playerCharacterDB.humanity = playerHumanity.parse(playerHumanityJSON);

	if (playerItemDB?.status === 200) {
		playerCharacterDB.items = playerItem.merge(idSchema).array().optional().parse(playerItems);
	} else {
		playerCharacterDB.items = undefined;
	}

	let status: PlayerStatus[] | undefined = undefined;
	if (playerStatusRes?.status === 200) {
		status = playerStatus.array().optional().parse(playerStatusJSON);
	}
	playerCharacterDB.characterStatus = status;

	// Daten-Gesamt-Schema validieren
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
	const baseRequestBody = playerCharacterBaseCreateRequestBody.parse(requestJson);
	const playerCharacterBaseDB = await fetch(`/api/lotn/character/base`, {
		method: 'POST',
		body: JSON.stringify(baseRequestBody)
	});
	const baseResult = playerCharacterBase.parse(await playerCharacterBaseDB.json());

	// Request-Bodies parsen
	const attributesRequestBody = playerAttributeRequestBodyDB.parse({
		...playerCharacterCreateBodyParsed.data.attributes,
		character_id: baseResult.id
	});
	const skillsRequestBody = playerSkillRequestBodyDB.parse({
		skills: playerCharacterCreateBodyParsed.data.skills,
		character_id: baseResult.id
	});
	const disciplineRequestBody = playerDisciplineRequestBodyDB.parse({
		disciplines: playerCharacterCreateBodyParsed.data.disciplines,
		character_id: baseResult.id
	});
	const moralityRequestBody = playerMoralityRequestBodyDB.parse({
		morality: playerCharacterCreateBodyParsed.data.morality,
		character_id: baseResult.id
	});
	const backgroundsRequestBody = playerBackgroundRequestBodyDB.parse({
		backgrounds: playerCharacterCreateBodyParsed.data.backgrounds,
		character_id: baseResult.id
	});
	const formulasRequestBody = playerCharacterCreateBodyParsed.data.formulas
		? playerFormulaRequestBodyDB.parse({
				formulas: playerCharacterCreateBodyParsed.data.formulas,
				character_id: baseResult.id
			})
		: undefined;
	const ceremoniesRequestBody = playerCharacterCreateBodyParsed.data.ceremonies
		? playerCeremonyRequestBodyDB.parse({
				ceremonies: playerCharacterCreateBodyParsed.data.ceremonies,
				character_id: baseResult.id
			})
		: undefined;
	const ritualsRequestBody = playerCharacterCreateBodyParsed.data.rituals
		? playerRitualRequestBodyDB.parse({
				rituals: playerCharacterCreateBodyParsed.data.rituals,
				character_id: baseResult.id
			})
		: undefined;
	const hungerRequestBody = playerHungerRequestBodyDB.parse({
		value: playerCharacterCreateBodyParsed.data.hunger.value,
		character_id: baseResult.id
	});
	const healthRequestBody = playerHealthRequestBodyDB.parse({
		normal: playerCharacterCreateBodyParsed.data.health.normal,
		aggrevated: playerCharacterCreateBodyParsed.data.health.aggrevated,
		character_id: baseResult.id
	});
	const willpowerRequestBody = playerWillpowerRequestBodyDB.parse({
		value: playerCharacterCreateBodyParsed.data.willpower.value,
		character_id: baseResult.id
	});
	const humanityRequestBody = playerHumanityRequestBodyDB.parse({
		value: playerCharacterCreateBodyParsed.data.humanity.value,
		stains: playerCharacterCreateBodyParsed.data.humanity.stains,
		character_id: baseResult.id
	});
	const meritRequestBody = playerCharacterCreateBodyParsed.data.merits
		? playerMeritRequestBodyDB.parse({
				merits: playerCharacterCreateBodyParsed.data.merits,
				character_id: baseResult.id
			})
		: undefined;
	const flawRequestBody = playerCharacterCreateBodyParsed.data.flaws
		? playerFlawRequestBodyDB.parse({
				flaws: playerCharacterCreateBodyParsed.data.flaws,
				character_id: baseResult.id
			})
		: undefined;
	const experienceRequestBody = playerExperienceRequestBodyDB.parse({
		experience: playerCharacterCreateBodyParsed.data.experience,
		character_id: baseResult.id
	});
	const loresheetRequestBody = playerCharacterCreateBodyParsed.data.loresheet
		? playerLoresheetRequestBodyDB.parse({
				name: playerCharacterCreateBodyParsed.data.loresheet?.name,
				values: playerCharacterCreateBodyParsed.data.loresheet?.values,
				character_id: baseResult.id
			})
		: undefined;
	const itemRequestBody = playerCharacterCreateBodyParsed.data.items
		? playerItemRequestBodyDB.parse({
				items: playerCharacterCreateBodyParsed.data.items,
				character_id: baseResult.id
			})
		: undefined;

	// Daten in DB speichern
	const [
		attributesRequestBodyDB,
		skillsRequestBodyDB,
		disciplineRequestBodyDB,
		moraltiyRequestBodyDB,
		backgroundRequestBodyDB,
		hungerRequestBodyDB,
		healthRequestBodyDB,
		willpowerRequestBodyDB,
		humanityRequestBodyDB,
		experienceRequestBodyDB
	] = await Promise.all([
		fetch(`/api/lotn/character/attributes`, {
			method: 'POST',
			body: JSON.stringify(attributesRequestBody)
		}),
		fetch(`/api/lotn/character/skills`, {
			method: 'POST',
			body: JSON.stringify(skillsRequestBody)
		}),
		fetch(`/api/lotn/character/disciplines`, {
			method: 'POST',
			body: JSON.stringify(disciplineRequestBody)
		}),
		fetch(`/api/lotn/character/morality`, {
			method: 'POST',
			body: JSON.stringify(moralityRequestBody)
		}),
		fetch(`/api/lotn/character/backgrounds`, {
			method: 'POST',
			body: JSON.stringify(backgroundsRequestBody)
		}),
		fetch(`/api/lotn/character/hunger`, {
			method: 'POST',
			body: JSON.stringify(hungerRequestBody)
		}),
		fetch(`/api/lotn/character/health`, {
			method: 'POST',
			body: JSON.stringify(healthRequestBody)
		}),
		fetch(`/api/lotn/character/willpower`, {
			method: 'POST',
			body: JSON.stringify(willpowerRequestBody)
		}),
		fetch(`/api/lotn/character/humanity`, {
			method: 'POST',
			body: JSON.stringify(humanityRequestBody)
		}),
		fetch(`/api/lotn/character/experience`, {
			method: 'POST',
			body: JSON.stringify(experienceRequestBody)
		})
	]);

	// Überprüfen ob alle Daten erfolgreich gespeichert wurden
	if (
		attributesRequestBodyDB.status !== HttpStatusCode.OK ||
		skillsRequestBodyDB.status !== HttpStatusCode.OK ||
		disciplineRequestBodyDB.status !== HttpStatusCode.OK ||
		moraltiyRequestBodyDB.status !== HttpStatusCode.OK ||
		backgroundRequestBodyDB.status !== HttpStatusCode.OK ||
		hungerRequestBodyDB.status !== HttpStatusCode.OK ||
		healthRequestBodyDB.status !== HttpStatusCode.OK ||
		willpowerRequestBodyDB.status !== HttpStatusCode.OK ||
		humanityRequestBodyDB.status !== HttpStatusCode.OK ||
		experienceRequestBodyDB.status !== HttpStatusCode.OK
	) {
		fetch(`/api/lotn/character`, {
			method: 'DELETE',
			body: JSON.stringify({ id: baseResult.id })
		});
		error(
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			'Ein oder mehrere Daten konnten nicht gespeichert werden'
		);
	}

	// JSON aus den Responses laden
	const [
		attributesRequestBodyJSON,
		skillsRequestBodyJSON,
		disciplineRequestBodyJSON,
		moraltiyRequestBodyJSON,
		backgroundRequestBodyJSON,
		hungerRequestBodyJSON,
		healthRequestBodyJSON,
		willpowerRequestBodyJSON,
		humanityRequestBodyJSON,
		experienceRequestBodyJSON
	] = await Promise.all([
		attributesRequestBodyDB.json(),
		skillsRequestBodyDB.json(),
		disciplineRequestBodyDB.json(),
		moraltiyRequestBodyDB.json(),
		backgroundRequestBodyDB.json(),
		hungerRequestBodyDB.json(),
		healthRequestBodyDB.json(),
		willpowerRequestBodyDB.json(),
		humanityRequestBodyDB.json(),
		experienceRequestBodyDB.json()
	]);

	// optionale Elemente ggfs. in DB schreiben
	const ceremoniesRequestBodyJSON = await writeToDb(
		ceremoniesRequestBody,
		'/api/lotn/character/ceremonies',
		fetch
	);
	const formulasRequestBodyJSON = await writeToDb(
		formulasRequestBody,
		'/api/lotn/character/formulas',
		fetch
	);
	const ritualsRequestBodyJSON = await writeToDb(
		ritualsRequestBody,
		'/api/lotn/character/rituals',
		fetch
	);
	const meritRequestBodyJSON = await writeToDb(
		meritRequestBody,
		'/api/lotn/character/merits',
		fetch
	);
	const flawRequestBodyJSON = await writeToDb(flawRequestBody, '/api/lotn/character/flaws', fetch);
	const loresheetRequestBodyJSON = await writeToDb(
		loresheetRequestBody,
		'/api/lotn/character/loresheet',
		fetch
	);
	const itemRequestBodyJSON = await writeToDb(itemRequestBody, '/api/lotn/character/items', fetch);

	// Daten in Struktur parsen
	const attributeResult = playerAttribute.parse(attributesRequestBodyJSON);
	const skillsResult = playerSkill.array().parse(skillsRequestBodyJSON);
	const disciplineResult = playerDiscipline.array().parse(disciplineRequestBodyJSON);
	const moralityResult = playerMorality.array().parse(moraltiyRequestBodyJSON);
	const backgroundResult = playerBackground
		.merge(idSchema)
		.array()
		.parse(backgroundRequestBodyJSON);
	const formulasResult = playerFormula.array().optional().parse(formulasRequestBodyJSON);
	const ceremoniesResult = oblivionCeremonyName.array().optional().parse(ceremoniesRequestBodyJSON);
	const ritualsResult = bloodSorceryRitualName.array().optional().parse(ritualsRequestBodyJSON);
	const hungerResult = playerHunger.parse(hungerRequestBodyJSON);
	const healthResult = playerHealth.parse(healthRequestBodyJSON);
	const willpowerResult = playerWillpower.parse(willpowerRequestBodyJSON);
	const humanityResult = playerHealth.parse(humanityRequestBodyJSON);
	const meritsResult = playerMerit.merge(idSchema).array().parse(meritRequestBodyJSON);
	const flawsResult = playerFlaw.merge(idSchema).array().parse(flawRequestBodyJSON);
	const experienceResult = playerExperience.array().parse(experienceRequestBodyJSON);
	const loresheetResult = playerLoresheet.optional().parse(loresheetRequestBodyJSON);
	const itemsResult = playerItem.array().optional().parse(itemRequestBodyJSON);

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
			items: itemsResult
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
