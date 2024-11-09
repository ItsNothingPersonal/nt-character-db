import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const havenConfigSchema = createBackgroundConfigSchema('Haven');
export type HavenConfigSchema = z.infer<typeof havenConfigSchema>;
