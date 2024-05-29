import { z } from 'zod';

export const formUserLogin = z.object({
	email: z.string().email(),
	password: z.string()
});

export type FormUserLogin = z.infer<typeof formUserLogin>;
