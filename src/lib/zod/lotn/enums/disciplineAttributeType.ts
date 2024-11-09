import { z } from 'zod';

export const disciplineAttributeType = z.enum(['Physical', 'Social', 'Mental', 'Variable']);
export type DisciplineAttributeType = z.infer<typeof disciplineAttributeType>;
