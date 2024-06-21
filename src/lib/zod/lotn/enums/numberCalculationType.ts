import { z } from 'zod';

export const numberCalculationType = z.enum(['add', 'substract']);
export type NumberCalculationType = z.infer<typeof numberCalculationType>;
