import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const familiarConfigSchema = createBackgroundConfigSchema('Familiar');
export type FamiliarConfigSchema = z.infer<typeof familiarConfigSchema>;
