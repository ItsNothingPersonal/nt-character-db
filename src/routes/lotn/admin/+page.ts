import { playerCharacterSelection } from '$lib/zod/lotn/types/playerCharacterSelection';
import { z } from 'zod';

export async function load({ fetch }) {
	const loadCharacterAcceptedResponse = await fetch(`/api/lotn/loadCharacters`, {
		method: 'POST',
		body: JSON.stringify({ mode: 'all' })
	});

	const json = await loadCharacterAcceptedResponse.json();

	return {
		charactersAccepted: playerCharacterSelection
			.extend({ username: z.string() })
			.array()
			.parse(json)
	};
}
