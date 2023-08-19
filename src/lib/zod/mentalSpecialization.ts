import { z } from 'zod';

export const mentalSpecialization = z.enum(['Perception', 'Intelligence', 'Wits']);
export type MentalSpecialization = z.infer<typeof mentalSpecialization>;
