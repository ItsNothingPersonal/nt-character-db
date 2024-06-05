import { z } from 'zod';

export const numberUpdateBody = z.object({
	value: z.number().min(0).max(30)
});

export type NumberUpdateBody = z.infer<typeof numberUpdateBody>;
