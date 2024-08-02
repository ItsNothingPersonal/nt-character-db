import { z } from 'zod';
import { sectName } from '../enums/sectName';

export const playerStatus = z.object({
	sect: sectName,
	value: z.number().int().min(0).max(5),
	monikers: z
		.union([z.string(), z.array(z.string())])
		.transform((val) => (Array.isArray(val) ? val.join(', ') : val))
		.optional(),
	support: z.string().array().optional(),
	opposition: z.string().array().optional()
});
export type PlayerStatus = z.infer<typeof playerStatus>;

export const playerStatusDB = playerStatus.extend({
	id: z.string().optional(),
	monikers: z
		.array(z.string())
		.transform((e) => e.join(', '))
		.optional()
});
export type PlayerStatusDB = z.infer<typeof playerStatusDB>;

export const playerStatusRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	status: playerStatusDB.array().nonempty().optional()
});
export type PlayerStatusRequestBodyDB = z.infer<typeof playerStatusRequestBodyDB>;

export const playerStatusUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerStatusDB.array().nonempty()
});
export type PlayerStatusUpdateRequestBody = z.infer<typeof playerStatusUpdateRequestBody>;
