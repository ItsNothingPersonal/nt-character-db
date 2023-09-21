import { z } from 'zod';

export const attackMode = z.enum(['Melee', 'Ranged']);
export type AttackMode = z.infer<typeof attackMode>;
