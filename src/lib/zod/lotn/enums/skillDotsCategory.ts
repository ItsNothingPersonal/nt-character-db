import { z } from 'zod';

export const skillDotCategory = z.literal(1).or(z.literal(2).or(z.literal(3)));
export type SkillDotCategory = z.infer<typeof skillDotCategory>;
