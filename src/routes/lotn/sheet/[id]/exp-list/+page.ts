import { playerCharacterBase } from '$lib/zod/lotn/playerCharacter/playerCharacterBase.js';
import { playerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience';

export async function load({ fetch, params }) {
	const loadCharacterExperienceResponse = await fetch(
		`/api/lotn/character/experience?id=${params.id}`
	);
	const loadCharacterBaseResponse = await fetch(`/api/lotn/character/base?id=${params.id}`);

	return {
		baseData: playerCharacterBase.parse(await loadCharacterBaseResponse.json()),
		expList: playerExperience.array().parse(await loadCharacterExperienceResponse.json())
	};
}
