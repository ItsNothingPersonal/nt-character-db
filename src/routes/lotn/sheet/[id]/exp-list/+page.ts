import { playerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience';

export async function load({ fetch, params }) {
	const loadCharacterExperienceResponse = await fetch(
		`/api/lotn/character/experience?id=${params.id}`
	);

	return {
		expList: playerExperience.array().parse(await loadCharacterExperienceResponse.json())
	};
}
