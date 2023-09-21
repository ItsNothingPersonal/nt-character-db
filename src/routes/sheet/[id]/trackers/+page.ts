import { playerBeastTraits } from '$lib/zod/playerCharacter/playerBeastTraits';
import { playerBlood } from '$lib/zod/playerCharacter/playerBlood';
import { playerDamageTaken } from '$lib/zod/playerCharacter/playerDamageTaken';
import { playerWillpower } from '$lib/zod/playerCharacter/playerWillpower';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const responseBlood = await fetch(`/api/character/blood?id=${params.id}`);
	const blood = playerBlood.parse(await responseBlood.json());

	const responseWillpower = await fetch(`/api/character/willpower?id=${params.id}`);
	const willpower = playerWillpower.parse(await responseWillpower.json());

	const responseDamageTaken = await fetch(`/api/character/damageTaken?id=${params.id}`);
	const damageTaken = playerDamageTaken.parse(await responseDamageTaken.json());

	const responseBeastTraits = await fetch(`/api/character/beastTraits?id=${params.id}`);
	const beastTraits = playerBeastTraits.parse(await responseBeastTraits.json());

	return { blood, willpower, damageTaken, beastTraits };
}) satisfies PageLoad;
