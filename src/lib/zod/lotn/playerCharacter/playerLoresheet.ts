import { z } from 'zod';
import { loresheetName } from '../enums/loresheetName';

export const playerLoresheet = z.object({
	name: loresheetName,
	values: z.coerce.number().int().min(1).max(3).array()
});

export type PlayerLoresheet = z.infer<typeof playerLoresheet>;
