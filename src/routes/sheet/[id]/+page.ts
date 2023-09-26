import { playerCharacter } from '$lib/zod/playerCharacter/playerCharacter';

export async function load({ params, fetch }) {
	const response = await fetch(`/api/character?id=${params.id}`);
	const characterData = playerCharacter.parse(await response.json());

	return {
		characterData
	};
}
