import { z } from 'zod';

export const attackMode = z.enum(['Melee', 'RangedPhysical', 'RangedMagical']);
export type AttackMode = z.infer<typeof attackMode>;
