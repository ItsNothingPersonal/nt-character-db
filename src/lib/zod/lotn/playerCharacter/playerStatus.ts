import { transformStringToArray } from '$lib/util';
import { z } from 'zod';
import { sectName } from '../enums/sectName';

export const playerStatusDB = z.object({
	sect: sectName.optional(),
	value: z.number().int().min(0).max(5).optional(),
	monikers: z.string().transform(transformStringToArray).optional(),
	support: z.string().transform(transformStringToArray).optional(),
	opposition: z.string().transform(transformStringToArray).optional()
});
export const playerStatus = z.object({
	sect: sectName,
	value: z.number().int().min(0).max(5),
	monikers: z.array(z.string()).optional(),
	support: z.array(z.string()).optional(),
	opposition: z.array(z.string()).optional()
});

export type PlayerStatusDB = z.infer<typeof playerStatusDB>;
export type PlayerStatus = z.infer<typeof playerStatus>;
