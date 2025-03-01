import { z } from 'zod';

export const registrationError = z.object({
	field: z.string(),
	message: z.string()
});

export type RegistrationError = z.infer<typeof registrationError>;
