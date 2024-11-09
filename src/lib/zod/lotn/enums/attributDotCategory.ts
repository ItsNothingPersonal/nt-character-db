import { z } from 'zod';

export const attributeDotCategory = z.literal(1).or(z.literal(2).or(z.literal(3).or(z.literal(4))));
export type AttributeDotCategory = z.infer<typeof attributeDotCategory>;
