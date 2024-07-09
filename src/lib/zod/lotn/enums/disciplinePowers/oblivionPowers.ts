import { z } from 'zod';

export const oblivionPowers = z.enum([
	'Shadow Cloak',
	"Oblivion's Sight",
	'Arms of Ahriman',
	'Shadow Cast',
	'Masque of Death',
	'Aura of Decay',
	"Reaper's Passing",
	'Stygian Shroud',
	'Touch of Oblivion',
	'Shadowstep',
	'Tenebrous Avatar'
]);
export type OblivionPowers = z.infer<typeof oblivionPowers>;
