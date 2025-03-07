import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import HttpStatusCode from '$lib/httpStatusCode';
import { playerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ params, fetch }) {
	if (!get(characterStore) || get(characterStore).id !== params.id) {
		const response = await fetch(`/api/lotn/character?id=${params.id}`);

		if (response.status === HttpStatusCode.OK) {
			const json = await response.json();
			characterStore.set(playerCharacter.parse(json));
		} else {
			error(HttpStatusCode.NOT_FOUND, 'Charakter konnte nicht geladen werden');
		}
	}
}
