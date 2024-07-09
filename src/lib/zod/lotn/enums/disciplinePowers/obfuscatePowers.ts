import { z } from 'zod';

export const obfuscatePowers = z.enum([
	'Conceal',
	'Silence of Death',
	'Chimerstry',
	'Unseen Passage',
	'Cache',
	'Fata Morgana',
	'Ghost in the Machine',
	'Mask of a Thousand Faces',
	"Vanish from the Mind's Eye",
	'Soul Mask',
	'Cloak the Gathering',
	'Phantom Hunter'
]);
export type ObfuscatePowers = z.infer<typeof obfuscatePowers>;
