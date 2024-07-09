import type { z } from 'zod';
import { createFlawsSchema } from '../util';

export const flawsConfigSchema = createFlawsSchema();
export type FlawsConfigSchema = z.infer<typeof flawsConfigSchema>;
