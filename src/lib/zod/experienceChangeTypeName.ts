import { z } from 'zod';

export const experienceChangeTypeName = z.enum(['add', 'substract']);
export type ExperienceChangeTypeName = z.infer<typeof experienceChangeTypeName>;
