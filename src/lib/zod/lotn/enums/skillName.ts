import { z } from 'zod';

export const skillName = z.enum([
	'Athletics',
	'Brawl',
	'Crafts',
	'Drive',
	'Marksmanship',
	'Melee',
	'Larceny',
	'Stealth',
	'Survival',
	'Animal Ken',
	'Etiquette',
	'Insight',
	'Intimidation',
	'Leadership',
	'Performance',
	'Persuasion',
	'Streetwise',
	'Subterfuge',
	'Academics',
	'Awareness',
	'Finance',
	'Investigation',
	'Medicine',
	'Occult',
	'Politics',
	'Science',
	'Technology'
]);
export type SkillName = z.infer<typeof skillName>;
