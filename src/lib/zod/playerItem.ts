import { z } from 'zod';
import { itemQualityName } from './itemQualityName';
import { itemType } from './itemType';

export const playerItem = z.object({
	name: z.string().nonempty().min(1).max(30),
	type: itemType,
	qualities: itemQualityName.array().min(1).max(3).nonempty()
});

export type PlayerItem = z.infer<typeof playerItem>;
