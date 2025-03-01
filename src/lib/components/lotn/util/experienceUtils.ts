import type { PlayerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience';

export function parseExperienceList(experience: PlayerExperience[]) {
	const gained = experience
		.filter((e) => e.type === 'add')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	const spent = experience
		.filter((e) => e.type === 'substract')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	const left = 20 + gained - spent;

	return { gained, spent, left };
}
