import { z } from 'zod';

export const skillName = z.enum([
	'Academics',
	'Animal Ken',
	'Athletics',
	'Awareness',
	'Brawl',
	'Computers',
	'Crafts',
	'Dodge',
	'Drive',
	'Empathy',
	'Firearms',
	'Intimidation',
	'Investigation',
	'Leadership',
	'Linguistics',
	'Lore',
	'Medicine',
	'Melee',
	'Occult',
	'Performance',
	'Science',
	'Security',
	'Stealth',
	'Streetwise',
	'Subterfuge',
	'Survival'
]);
export type SkillName = z.infer<typeof skillName>;
