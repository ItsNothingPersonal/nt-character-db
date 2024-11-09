import { z } from 'zod';

export const disciplineName = z.enum([
	'Animalism',
	'Auspex',
	'Blood Sorcery',
	'Celerity',
	'Dominate',
	'Fortitude',
	'Obfuscate',
	'Oblivion',
	'Potence',
	'Presence',
	'Protean',
	'Thin-Blood Alchemy'
]);
export type DisciplineName = z.infer<typeof disciplineName>;
