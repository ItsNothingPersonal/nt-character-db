import { z } from 'zod';

export const clanName = z.enum([
	'Banu Haqim',
	'Brujah',
	'Gangrel',
	'Hecata',
	'Lasombra',
	'Malkavian',
	'The Ministry',
	'Nosferatu',
	'Ravnos',
	'Salubri',
	'Toreador',
	'Tremere',
	'Tzimisce',
	'Ventrue',
	'Caitiff',
	'Thin-Blooded'
]);
export type ClanName = z.infer<typeof clanName>;
