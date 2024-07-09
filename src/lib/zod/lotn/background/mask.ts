import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const maskConfigSchema = createBackgroundConfigSchema('Mask');
export type MaskConfigSchema = z.infer<typeof maskConfigSchema>;
