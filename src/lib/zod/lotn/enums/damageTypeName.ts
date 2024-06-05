import { z } from 'zod';

export const damageTypeName = z.enum(['normal', 'aggrevated']);
export type DamageTypeName = z.infer<typeof damageTypeName>;
