import { z } from 'zod';

export const physicalSpecialization = z.enum(['Strength', 'Dexterity', 'Stamina']);
export type PhysicalSpecialization = z.infer<typeof physicalSpecialization>;
