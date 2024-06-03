import { characterStore } from '$lib/components/classic/characterSheet/characterStore';
import { playerCharacter } from '$lib/zod/classic/playerCharacter/playerCharacter';

export async function load({ params, fetch }) {
	const response = await fetch(`/api/classic/character?id=${params.id}`);
	characterStore.set(playerCharacter.parse(await response.json()));
}
