import type { SkillName } from '$lib/zod/lotn/enums/skillName';
import {
	mentalSkill,
	physicalSkill,
	socialSkill,
	type MentalSkill,
	type PhysicalSkill,
	type SocialSkill
} from '$lib/zod/lotn/enums/skillName';

export function isPhysicalSkill(skill: SkillName): skill is PhysicalSkill {
	return physicalSkill.options.includes(skill as never);
}

export function isSocialSkill(skill: SkillName): skill is SocialSkill {
	return socialSkill.options.includes(skill as never);
}

export function isMentalSkill(skill: SkillName): skill is MentalSkill {
	return mentalSkill.options.includes(skill as never);
}
