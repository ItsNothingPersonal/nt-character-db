import {
	calculateAttributeCosts,
	calculateBackgroundCost,
	calculateFlawCost,
	calculateInClanDisciplineCosts,
	calculateMeritCost,
	calculateMoralityCosts,
	calculateNecromancyOrThaumaturgyRitualCost,
	calculateOutOfClanDisciplineCosts,
	calculateSkillCost,
	calculateTechniqueCosts
} from '$lib/validation/mutations/costCalculations';
import type { CharacterSheetSectionName } from '$lib/zod/classic/enums/characterSheetSectionName';
import type { CostConfigBody } from '$lib/zod/classic/validation/costConfigBody';

export const costConfig = new Map<CharacterSheetSectionName, CostConfigBody>([
	['Attribute', calculateAttributeCosts],
	['InClanDiscipline', calculateInClanDisciplineCosts],
	['OutOfClanDiscipline', calculateOutOfClanDisciplineCosts],
	['Morality', calculateMoralityCosts],
	['Technique', calculateTechniqueCosts],
	['RitualNecromancyOrThaumaturgy', calculateNecromancyOrThaumaturgyRitualCost],
	['Merit', calculateMeritCost],
	['Flaw', calculateFlawCost],
	['Skill', calculateSkillCost],
	['Background', calculateBackgroundCost]
]);
