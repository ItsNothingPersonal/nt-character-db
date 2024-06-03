import { playerBeastTraits } from '$lib/zod/classic/playerCharacter/playerBeastTraits';
import { playerBlood } from '$lib/zod/classic/playerCharacter/playerBlood';
import { playerDamageTaken } from '$lib/zod/classic/playerCharacter/playerDamageTaken';
import { playerWillpower } from '$lib/zod/classic/playerCharacter/playerWillpower';

export async function load({ params, fetch }) {
	const responseBlood = await fetch(`/api/classic/character/blood?id=${params.id}`);
	const blood = playerBlood.parse(await responseBlood.json());

	const responseWillpower = await fetch(`/api/classic/character/willpower?id=${params.id}`);
	const willpower = playerWillpower.parse(await responseWillpower.json());

	const responseDamageTaken = await fetch(`/api/classic/character/damageTaken?id=${params.id}`);
	const damageTaken = playerDamageTaken.parse(await responseDamageTaken.json());

	const responseBeastTraits = await fetch(`/api/classic/character/beastTraits?id=${params.id}`);
	const beastTraits = playerBeastTraits.parse(await responseBeastTraits.json());

	return { blood, willpower, damageTaken, beastTraits };
}
