import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import { playerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';

export async function load({ params, fetch }) {
	const response = await fetch(`/api/lotn/character?id=${params.id}`);
	characterStore.set(playerCharacter.parse(await response.json()));
}
