import { z } from 'zod';

export const priorities = z.enum(['Primary', 'Secondary', 'Tertiary']);
export type Priorities = z.infer<typeof priorities>;
