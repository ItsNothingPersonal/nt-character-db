import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const alliesConfigSchema = createBackgroundConfigSchema('Allies');
export type AlliesConfigSchema = z.infer<typeof alliesConfigSchema>;
