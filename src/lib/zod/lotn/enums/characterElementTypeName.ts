import { z } from 'zod';

export const characterElementTypeName = z.enum([
	'Attribute',
	'Skill',
	'Background',
	'Merit',
	'Loresheet',
	'Discipline',
	'Ritual',
	'Ceremony',
	'Thin-Blood Formula',
	'Blood Potency',
	'Humanity',
	'Level 1 Discipline Power'
]);
export type CharacterElementTypeName = z.infer<typeof characterElementTypeName>;
