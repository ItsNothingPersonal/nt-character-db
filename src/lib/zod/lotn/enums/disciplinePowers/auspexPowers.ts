import { z } from 'zod';

export const auspexPowers = z.enum([
	'Heightened Senses',
	'Sense the Unseen',
	'Panacea',
	'Premonition',
	'Scry the Soul',
	'Collective Cognizance',
	'Share the Senses',
	'Unveil the Edifice',
	"Spirit's Touch",
	'Clairvoyance',
	'Possession',
	'Telepathy',
	'Unburdening the Bestial Soul'
]);

export type AuspexPowers = z.infer<typeof auspexPowers>;
