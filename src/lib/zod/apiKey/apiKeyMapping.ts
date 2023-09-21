import { z } from 'zod';

export const apiKeyMapping = z.object({
	api_key: z.string().uuid(),
	characters: z.string().array()
});

export type ApiKeyMapping = z.infer<typeof apiKeyMapping>;
