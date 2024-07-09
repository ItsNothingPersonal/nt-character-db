import type { z } from 'zod';
import { createCeremoniesSchema } from '../util';

export const oblivionCeremoniesConfigSchema = createCeremoniesSchema();
export type OblivionCeremoniesConfigSchema = z.infer<typeof oblivionCeremoniesConfigSchema>;
