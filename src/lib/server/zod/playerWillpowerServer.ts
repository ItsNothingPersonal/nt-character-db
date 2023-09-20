import { playerWillpower } from '$lib/zod/playerWillpower';
import { z } from 'zod';

export const playerWillpowerServer = playerWillpower.extend({
	id: z.string()
});

export type PlayerWillpowerServer = z.infer<typeof playerWillpowerServer>;
