import { z } from 'zod';

export const attributeName = z.enum([
	'Strength',
	'Dexterity',
	'Stamina',
	'Charisma',
	'Manipulation',
	'Composure',
	'Intelligence',
	'Wits',
	'Resolve'
]);
export type AttributeName = z.infer<typeof attributeName>;
