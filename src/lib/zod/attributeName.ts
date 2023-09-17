import { z } from 'zod';

export const attributeName = z.enum(['Physical', 'Social', 'Mental']);
export type AttributeName = z.infer<typeof attributeName>;
