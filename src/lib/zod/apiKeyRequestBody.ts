import { z } from 'zod';

export const apiKeyRequestBody = z.object({
	apiKey: z.string().uuid()
});

export type ApiKeyRequestBody = z.infer<typeof apiKeyRequestBody>;
