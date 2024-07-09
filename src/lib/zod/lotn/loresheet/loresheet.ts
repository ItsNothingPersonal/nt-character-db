import type { z } from 'zod';
import { createLoresheetSchema } from '../util';

export const loresheetConfigSchema = createLoresheetSchema();
export type LoresheetConfigSchema = z.infer<typeof loresheetConfigSchema>;
