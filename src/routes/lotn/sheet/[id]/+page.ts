import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import HttpStatusCode from '$lib/httpStatusCode';
import { playerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import { get } from 'svelte/store';

export async function load({ params, fetch }) {
	if (!get(characterStore) || get(characterStore).id !== params.id) {
		const response = await fetch(`/api/lotn/character?id=${params.id}`);

		if (response.status === HttpStatusCode.OK) {
			characterStore.set(playerCharacter.parse(await response.json()));
		}
	}
}
