import { z } from 'zod';

export const itemQualityName = z.enum([
	'Bane - Fire',
	'Bane - Silver',
	'Bane - Cold Iron',
	'Concealable',
	'Destructive',
	'Devastating',
	'Reach',
	'Staking',
	'Automatic Fire',
	'Blasting',
	'Compact',
	'Long Range',
	'Silenced',
	'Inconspicuous',
	'Ballistic',
	'Deflecting',
	'Environmental',
	'Sturdy',
	'Proficient',
	'Superior',
	'Artisan'
]);
export type ItemQualityName = z.infer<typeof itemQualityName>;
