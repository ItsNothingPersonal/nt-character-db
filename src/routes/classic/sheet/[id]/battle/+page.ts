import { playerAttribute } from '$lib/zod/classic/playerCharacter/playerAttribute';
import { playerDiscipline } from '$lib/zod/classic/playerCharacter/playerDiscipline';
import { playerItem } from '$lib/zod/classic/playerCharacter/playerItem';
import { playerSkill } from '$lib/zod/classic/playerCharacter/playerSkill';
import { playerWillpower } from '$lib/zod/classic/playerCharacter/playerWillpower';

export async function load({ params, fetch }) {
	const responseAttributes = await fetch(`/api/classic/character/attributes?id=${params.id}`);
	const attributes = playerAttribute.parse(await responseAttributes.json());

	const responseDisciplines = await fetch(`/api/classic/character/disciplines?id=${params.id}`);
	const disciplines = playerDiscipline.array().parse(await responseDisciplines.json());

	const responseSkills = await fetch(`/api/classic/character/skills?id=${params.id}`);
	const skills = playerSkill.array().parse(await responseSkills.json());

	const responseWillpower = await fetch(`/api/classic/character/willpower?id=${params.id}`);
	const willpower = playerWillpower.parse(await responseWillpower.json());

	const responseItems = await fetch(`/api/classic/character/items?id=${params.id}`);
	const items = playerItem.array().parse(await responseItems.json());

	return { attributes, disciplines, skills, willpower, items };
}
