import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
import HttpStatusCode from '$lib/httpStatusCode';
import { playerCharacterSelectionStore } from '$lib/stores/selectionStore';
import { playerCharacter } from '$lib/zod/lotn/playerCharacter/playerCharacter';
import { playerCharacterSelection } from '$lib/zod/lotn/types/playerCharacterSelection';
import { get } from 'svelte/store';

export async function load({ params, fetch }) {
	if (!get(characterStore) || get(characterStore).id !== params.id) {
		const response = await fetch(`/api/lotn/character?id=${params.id}`);

		if (response.status === HttpStatusCode.OK) {
			characterStore.set(playerCharacter.parse(await response.json()));
		}
	}

	if (
		!get(playerCharacterSelectionStore).characters &&
		!get(playerCharacterSelectionStore).drafts
	) {
		const loadCharacterResponse = await fetch(`/api/lotn/loadCharacters`, {
			method: 'POST'
		});

		const loadCharacterDraftResponse = await fetch(`/api/lotn/loadDrafts`, {
			method: 'POST'
		});

		if (
			loadCharacterResponse.status === HttpStatusCode.OK &&
			loadCharacterDraftResponse.status === HttpStatusCode.OK
		) {
			playerCharacterSelectionStore.set({
				characters: playerCharacterSelection.array().parse(await loadCharacterResponse.json()),
				drafts: playerCharacterSelection.array().parse(await loadCharacterDraftResponse.json())
			});
		}
	}
}
