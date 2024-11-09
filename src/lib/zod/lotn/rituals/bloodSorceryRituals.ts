import type { z } from 'zod';
import { createRitualSchema } from '../util';

export const bloodSorceryRitualConfigSchema = createRitualSchema();
export type BloodSorceryRitualConfigSchema = z.infer<typeof bloodSorceryRitualConfigSchema>;
