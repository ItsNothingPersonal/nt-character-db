import { z } from 'zod';

export const spheresOfInfluenceName = z.enum([
	'Church',
	'Finance',
	'Health',
	'High Society',
	'Industry',
	'Legal',
	'Media',
	'Occult',
	'Police',
	'Politics',
	'Service Industry',
	'Street',
	'Transportation',
	'Underworld',
	'University',
	'The Federal Government'
]);
export type SpheresOfInfluenceName = z.infer<typeof spheresOfInfluenceName>;
