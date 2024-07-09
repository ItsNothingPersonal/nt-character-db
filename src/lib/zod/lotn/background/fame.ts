import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const fameConfigSchema = createBackgroundConfigSchema('Fame');
export type FameConfigSchema = z.infer<typeof fameConfigSchema>;
