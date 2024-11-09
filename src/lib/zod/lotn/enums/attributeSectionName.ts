import { z } from 'zod';

export const attributeSectionName = z.enum(['Physical', 'Social', 'Mental']);
export type AttributeSectionName = z.infer<typeof attributeSectionName>;
