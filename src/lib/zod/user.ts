import { z } from 'zod';
import { roleName } from './roleName';

export const pbUser = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string().email(),
	name: z.string(),
	avatar: z.string(),
	collectionId: z.string(),
	role: z.string().transform((e) => (e === '' ? roleName.parse('User') : roleName.parse(e)))
});

export type PBUser = z.infer<typeof pbUser>;
