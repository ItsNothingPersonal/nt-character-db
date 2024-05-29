import { z } from 'zod';

export const formUserCreate = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	passwordConfirm: z.string()
});

export type FormUserCreate = z.infer<typeof formUserCreate>;
