import { z } from 'zod';
import { flawName } from './flawName';

export const playerFlaw = z.object({
	name: flawName
});

export type PlayerFlaw = z.infer<typeof playerFlaw>;
