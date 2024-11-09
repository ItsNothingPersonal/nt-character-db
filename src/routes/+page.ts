import HttpStatusCode from '$lib/httpStatusCode';
import { playerCharacterSelectionStore } from '$lib/stores/selectionStore';
import { playerCharacterSelection } from '$lib/zod/lotn/types/playerCharacterSelection';
import { get } from 'svelte/store';

export async function load({ fetch }) {
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
