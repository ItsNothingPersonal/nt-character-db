import { playerAttribute } from '$lib/zod/playerCharacter/playerAttribute';
import { playerDiscipline } from '$lib/zod/playerCharacter/playerDiscipline';
import { playerItem } from '$lib/zod/playerCharacter/playerItem';
import { playerSkill } from '$lib/zod/playerCharacter/playerSkill';
import { playerWillpower } from '$lib/zod/playerCharacter/playerWillpower';

export async function load({ params, fetch }) {
	const responseAttributes = await fetch(`/api/character/attributes?id=${params.id}`);
	const attributes = playerAttribute.parse(await responseAttributes.json());

	const responseDisciplines = await fetch(`/api/character/disciplines?id=${params.id}`);
	const disciplines = playerDiscipline.array().parse(await responseDisciplines.json());

	const responseSkills = await fetch(`/api/character/skills?id=${params.id}`);
	const skills = playerSkill.array().parse(await responseSkills.json());

	const responseWillpower = await fetch(`/api/character/willpower?id=${params.id}`);
	const willpower = playerWillpower.parse(await responseWillpower.json());

	const responseItems = await fetch(`/api/character/items?id=${params.id}`);
	const items = playerItem.array().parse(await responseItems.json());

	return { attributes, disciplines, skills, willpower, items };
}
