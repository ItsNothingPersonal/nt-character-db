import { sectName } from '$lib/zod/lotn/enums/sectName';
import { statusChange } from '$lib/zod/lotn/enums/statusChange';
import { z } from 'zod';

export const formStatusUpdate = z.object({
	characterId: z.string(),
	statusChange: statusChange,
	sect: sectName
});

export type FormStatusUpdate = z.infer<typeof formStatusUpdate>;
