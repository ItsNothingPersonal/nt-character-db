import type { SkillName } from '$lib/zod/lotn/enums/skillName';
import {
	mentalSkill,
	physicalSkill,
	socialSkill,
	type MentalSkill,
	type PhysicalSkill,
	type SocialSkill
} from '$lib/zod/lotn/enums/skillName';
import { skillConfig } from '../config/skillConfig';

export function isPhysicalSkill(skill: SkillName): skill is PhysicalSkill {
	return physicalSkill.options.includes(skill as never);
}

export function isSocialSkill(skill: SkillName): skill is SocialSkill {
	return socialSkill.options.includes(skill as never);
}

export function isMentalSkill(skill: SkillName): skill is MentalSkill {
	return mentalSkill.options.includes(skill as never);
}

export function getSkillHelptext(skill: SkillName): string | undefined {
	if (isPhysicalSkill(skill)) {
		return skillConfig.physical[skill].helptext;
	} else if (isSocialSkill(skill)) {
		return skillConfig.social[skill].helptext;
	} else if (isMentalSkill(skill)) {
		return skillConfig.mental[skill].helptext;
	}
	return undefined;
}

export function hasSkillSpecializations(skillName: SkillName) {
	if (isPhysicalSkill(skillName)) {
		return skillConfig.physical[skillName].hasSpecializations;
	} else if (isSocialSkill(skillName)) {
		return skillConfig.social[skillName].hasSpecializations;
	} else if (isMentalSkill(skillName)) {
		return skillConfig.mental[skillName].hasSpecializations;
	}
	return false;
}
