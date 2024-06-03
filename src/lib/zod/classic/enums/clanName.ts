import { z } from 'zod';

export const clanName = z.enum([
	'Assamite',
	'Brujah',
	'Followers of Set',
	'Gangrel',
	'Giovanni',
	'Lasombra',
	'Malkavian',
	'Nosferatu',
	'Toreador',
	'Tremere',
	'Tzimisce',
	'Ventrue',
	'Caitiff'
]);
export type ClanName = z.infer<typeof clanName>;
