import { z } from 'zod';
import { oblivionCeremonyName } from '../enums/oblivionCeremonyName';

export const playerCeremony = z.object({
	ceremonies: oblivionCeremonyName.array().default([])
});

export type PlayerCeremony = z.infer<typeof playerCeremony>;
