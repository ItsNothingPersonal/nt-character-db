import { sectName } from '$lib/zod/lotn/enums/sectName';
import { z } from 'zod';

export const formStatusIncreaseUpdate = z.object({
	sect: sectName,
	moniker: z.string()
});

export type FormStatusIncreaseUpdate = z.infer<typeof formStatusIncreaseUpdate>;
