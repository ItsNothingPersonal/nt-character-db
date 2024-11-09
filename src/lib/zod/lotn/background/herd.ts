import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const herdConfigSchema = createBackgroundConfigSchema('Herd');
export type HerdConfigSchema = z.infer<typeof herdConfigSchema>;
