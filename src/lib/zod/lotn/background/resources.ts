import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const resourcesConfigSchema = createBackgroundConfigSchema('Resources');
export type ResourcesConfigSchema = z.infer<typeof resourcesConfigSchema>;
