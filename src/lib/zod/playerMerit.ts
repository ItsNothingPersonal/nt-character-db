import { z } from 'zod';
import { meritName } from './meritName';

export const playerMerit = z.object({
	name: meritName
});

export type PlayerMerit = z.infer<typeof playerMerit>;
