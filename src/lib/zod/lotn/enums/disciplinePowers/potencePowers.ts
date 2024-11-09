import { z } from 'zod';

export const potencePowers = z.enum([
	'Prowess',
	'Soaring Leap',
	'Lethal Body',
	'Uncanny Grip',
	'Brutal Feed',
	'Staggering Strike',
	'Fist of Caine',
	'Savage Pursuit',
	'Earth Shock',
	'Puissance'
]);
export type PotencePowers = z.infer<typeof potencePowers>;
