import { z } from 'zod';

export const fortitudePowers = z.enum([
	'Resiliency',
	'Toughness',
	'Coagulate',
	'Enduring Beasts',
	'Unswayable Mind',
	'Valeren',
	'Roots of the Mountain',
	'Unyielding',
	'Aegis',
	'Adaptability',
	'Flesh of Marble',
	'Personal Armor'
]);
