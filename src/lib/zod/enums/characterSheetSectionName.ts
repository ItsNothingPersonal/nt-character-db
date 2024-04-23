import { z } from 'zod';

export const characterSheetSectionName = z.enum([
	'Attribute',
	'InClanDiscipline',
	'Morality',
	'RitualNecromancyOrThaumaturgy',
	'Background',
	'Skill',
	'OutOfClanDiscipline',
	'Technique',
	'Merit',
	'Flaw'
]);
export type CharacterSheetSectionName = z.infer<typeof characterSheetSectionName>;
