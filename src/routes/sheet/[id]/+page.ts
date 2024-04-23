import { characterStore } from '$lib/components/characterSheet/characterStore';
import { playerCharacter } from '$lib/zod/playerCharacter/playerCharacter';

export async function load({ params, fetch }) {
	const response = await fetch(`/api/character?id=${params.id}`);
	characterStore.set(playerCharacter.parse(await response.json()));
}
