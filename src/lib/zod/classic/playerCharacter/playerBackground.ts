import { z } from 'zod';
import { backgroundName } from '../enums/backgroundName';

export const playerBackground = z.object({
	name: backgroundName,
	value: z.number().min(1).max(7),
	specialization: z
		.union([z.string().min(1), z.string().max(60)])
		.optional()
		.transform((e) => (e === '' ? undefined : e))
});

export type PlayerBackground = z.infer<typeof playerBackground>;
