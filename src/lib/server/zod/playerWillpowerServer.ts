import { playerBlood } from '$lib/zod/playerBlood';
import { z } from 'zod';

export const playerWillpowerServer = playerBlood.extend({
	id: z.string()
});

export type PlayerWillpowerServer = z.infer<typeof playerWillpowerServer>;
