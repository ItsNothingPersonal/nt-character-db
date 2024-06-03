import { z } from 'zod';
import { meritName } from '../enums/meritName';

export const playerMerit = z.object({
	name: meritName
});

export type PlayerMerit = z.infer<typeof playerMerit>;
