import { playerBeastTraits } from '$lib/zod/playerBeastTraits';
import { z } from 'zod';

export const playerBeastTraitsServer = playerBeastTraits.extend({
	id: z.string()
});

export type PlayerBeastTraitsServer = z.infer<typeof playerBeastTraitsServer>;
