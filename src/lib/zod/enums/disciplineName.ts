import { z } from 'zod';

export const disciplineName = z.enum([
	'Abyss Mysticism',
	'Animalism',
	'Auspex',
	'Celerity',
	'Chimerstry',
	'Daimoinon',
	'Dementation',
	'Dominate',
	'Fortitude',
	'Kineticism',
	'Melpominee',
	'Mytherceria',
	'Obeah',
	'Obfuscate',
	'Obtenebration',
	'Potence',
	'Presence',
	'Protean',
	'Quietus',
	'Serpentis',
	'Spiritus',
	'Temporis',
	'Thanatosis',
	'Valeren',
	'Vicissitude',
	'Visceratika'
]);
export type DisciplineName = z.infer<typeof disciplineName>;
