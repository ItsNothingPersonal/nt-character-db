import { z } from 'zod';

export const socialSpecialization = z.enum(['Charisma', 'Manipulation', 'Appearance']);
export type SocialSpecialization = z.infer<typeof socialSpecialization>;
