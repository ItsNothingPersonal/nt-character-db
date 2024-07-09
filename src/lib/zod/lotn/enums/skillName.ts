import { z } from 'zod';

export const skillName = z.enum([
	'Athletics',
	'Brawl',
	'Crafts',
	'Driving',
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

export const physicalSkill = skillName.extract([
	'Athletics',
	'Brawl',
	'Crafts',
	'Driving',
	'Marksmanship',
	'Melee',
	'Larceny',
	'Stealth',
	'Survival'
]);
export type PhysicalSkill = z.infer<typeof physicalSkill>;

export const socialSkill = skillName.extract([
	'Animal Ken',
	'Etiquette',
	'Insight',
	'Intimidation',
	'Leadership',
	'Performance',
	'Persuasion',
	'Streetwise',
	'Subterfuge'
]);
export type SocialSkill = z.infer<typeof socialSkill>;

export const mentalSkill = skillName.extract([
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
export type MentalSkill = z.infer<typeof mentalSkill>;
