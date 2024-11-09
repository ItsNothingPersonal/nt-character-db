import { sectName } from '$lib/zod/lotn/enums/sectName';
import { z } from 'zod';

export const formStatusDecreaseUpdate = z.object({
	sect: sectName
});

export type FormStatusDecreaseUpdate = z.infer<typeof formStatusDecreaseUpdate>;
