import { playerBlood } from '$lib/zod/playerBlood';
import { playerDamageTaken } from '$lib/zod/playerDamageTaken';
import { playerWillpower } from '$lib/zod/playerWillpower';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const responseBlood = await fetch(`/api/character/blood?id=${params.id}`);
	const blood = playerBlood.parse(await responseBlood.json());

	const responseWillpower = await fetch(`/api/character/willpower?id=${params.id}`);
	const willpower = playerWillpower.parse(await responseWillpower.json());

	const responseDamageTaken = await fetch(`/api/character/damageTaken?id=${params.id}`);
	const damageTaken = playerDamageTaken.parse(await responseDamageTaken.json());

	return { blood, willpower, damageTaken };
}) satisfies PageLoad;
