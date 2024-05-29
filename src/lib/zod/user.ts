import { z } from 'zod';

export const pbUser = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string().email(),
	name: z.string(),
	avatar: z.string(),
	collectionId: z.string()
});

export type PBUser = z.infer<typeof pbUser>;
