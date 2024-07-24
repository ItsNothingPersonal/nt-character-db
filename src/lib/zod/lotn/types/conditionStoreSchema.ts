import { z } from 'zod';

export const conditionStoreSchema = z.object({
	blinded: z.boolean().default(false),
	distracted: z.boolean().default(false),
	frightened: z.boolean().default(false),
	grappled: z.boolean().default(false),
	helpless: z.boolean().default(false),
	impaired: z.boolean().default(false),
	prone: z.boolean().default(false),
	staggered: z.boolean().default(false),
	weakened: z.boolean().default(false)
});

export type ConditionStoreSchema = z.infer<typeof conditionStoreSchema>;
