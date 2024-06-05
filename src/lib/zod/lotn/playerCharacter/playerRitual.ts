import { z } from 'zod';
import { bloodSorceryRitualName } from '../enums/bloodSorceryRitualName';

export const playerRitual = z.object({
	rituals: bloodSorceryRitualName.array().default([])
});

export type PlayerRitual = z.infer<typeof playerRitual>;
