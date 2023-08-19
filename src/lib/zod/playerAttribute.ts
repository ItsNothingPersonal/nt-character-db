import { z } from 'zod';
import { mentalSpecialization } from './mentalSpecialization';
import { physicalSpecialization } from './physicalSpecialization';
import { socialSpecialization } from './socialSpecialization';

export const playerAttribute = z.object({
	physical_value: z.number().min(0).max(15),
	physical_specialization: physicalSpecialization.array().nonempty(),
	social_value: z.number().min(0).max(15),
	social_specialization: socialSpecialization.array().nonempty(),
	mental_value: z.number().min(0).max(15),
	mental_specialization: mentalSpecialization.array().nonempty()
});

export type PlayerAttribute = z.infer<typeof playerAttribute>;
