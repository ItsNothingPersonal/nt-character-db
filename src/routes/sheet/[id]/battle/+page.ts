import { playerAttribute } from '$lib/zod/playerAttribute';
import { playerDiscipline } from '$lib/zod/playerDiscipline';
import { playerSkill } from '$lib/zod/playerSkill';
import { playerWillpower } from '$lib/zod/playerWillpower';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const responseAttributes = await fetch(`/api/character/attributes?id=${params.id}`);
	const attributes = playerAttribute.parse(await responseAttributes.json());

	const responseDisciplines = await fetch(`/api/character/disciplines?id=${params.id}`);
	const disciplines = playerDiscipline.array().parse(await responseDisciplines.json());

	const responseSkills = await fetch(`/api/character/skills?id=${params.id}`);
	const skills = playerSkill.array().parse(await responseSkills.json());

	const responseWillpower = await fetch(`/api/character/willpower?id=${params.id}`);
	const willpower = playerWillpower.parse(await responseWillpower.json());

	return { attributes, disciplines, skills, willpower };
}) satisfies PageLoad;
