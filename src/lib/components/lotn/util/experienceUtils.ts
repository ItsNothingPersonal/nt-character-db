import type { PlayerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience';
import type { ProjectName } from '$lib/zod/projectName';
import { projectsDefinition } from '../config/projectsDefinition';

export function parseExperienceList(
	experience: PlayerExperience[],
	project: ProjectName | undefined
) {
	const gained = experience
		.filter((e) => e.type === 'add')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	const spent = experience
		.filter((e) => e.type === 'substract')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	const left = getProjectStartExp(project) + gained - spent;

	return { gained, spent, left };
}

export function getProjectStartExp(project: ProjectName | undefined) {
	if (!project) return 0;
	return projectsDefinition[project]?.startExp ?? 0;
}
