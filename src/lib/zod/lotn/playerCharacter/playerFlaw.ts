import { z } from 'zod';
import { flawName } from '../enums/flawName';

export const playerFlaw = z.object({
	name: flawName,
	value: z.number().int().min(0).max(5)
});

export type PlayerFlaw = z.infer<typeof playerFlaw>;
