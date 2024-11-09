import { z } from 'zod';

export const statusChange = z.enum(['Support', 'Opposition']);
export type StatusChange = z.infer<typeof statusChange>;
