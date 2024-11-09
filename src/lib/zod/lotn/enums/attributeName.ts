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

export type AttributeKeyMap = {
	Strength: 'strength';
	Dexterity: 'dexterity';
	Stamina: 'stamina';
	Charisma: 'charisma';
	Manipulation: 'manipulation';
	Composure: 'composure';
	Intelligence: 'intelligence';
	Wits: 'wits';
	Resolve: 'resolve';
};
