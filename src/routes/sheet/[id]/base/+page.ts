import { playerCharacter } from '$lib/zod/playerCharacter';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch(`/api/character?id=${params.id}`);
	const characterData = playerCharacter.parse(await response.json());

	return {
		characterData
	};
};
