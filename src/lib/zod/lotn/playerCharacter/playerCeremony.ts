import { z } from 'zod';
import { oblivionCeremonyName } from '../enums/oblivionCeremonyName';

export const playerCeremony = z.object({
	ceremonies: oblivionCeremonyName.array().default([])
});

export type PlayerCeremony = z.infer<typeof playerCeremony>;

export const playerCeremonyRequestBodyDB = playerCeremony.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerCeremonyRequestBodyDB = z.infer<typeof playerCeremonyRequestBodyDB>;
