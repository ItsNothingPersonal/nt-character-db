import { z } from 'zod';
import { formUserCreate } from './formUserCreate';

export const createUser = formUserCreate.extend({
	name: z.string()
});

export type CreateUser = z.infer<typeof createUser>;
