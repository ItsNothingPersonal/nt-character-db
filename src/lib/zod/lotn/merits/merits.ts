import type { z } from 'zod';
import { createMeritsSchema } from '../util';

export const meritsConfigSchema = createMeritsSchema();
export type MeritsConfigSchema = z.infer<typeof meritsConfigSchema>;
