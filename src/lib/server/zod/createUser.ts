import { roleName } from '$lib/zod/roleName';
import { z } from 'zod';
import { formUserCreate } from './formUserCreate';

export const createUser = formUserCreate.extend({
	name: z.string(),
	role: roleName.default('User'),
	emailVisibility: z.boolean().default(false)
});

export type CreateUser = z.infer<typeof createUser>;
