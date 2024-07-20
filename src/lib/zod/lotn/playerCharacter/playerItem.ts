import { z } from 'zod';
import { itemQualityName } from '../enums/itemQualityName';
import { itemTypeName } from '../enums/itemTypeName';
import { idSchema } from '../util';

export const playerItem = z.object({
	name: z.string().max(20),
	quality: itemQualityName,
	description: z.string().max(60).optional(),
	type: itemTypeName
});
export type PlayerItem = z.infer<typeof playerItem>;

export const playerItemSingleRequestBodyDB = playerItem.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerItemSingleRequestBodyDB = z.infer<typeof playerItemSingleRequestBodyDB>;

export const playerItemRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	items: playerItem.array().nonempty()
});
export type PlayerItemRequestBodyDB = z.infer<typeof playerItemRequestBodyDB>;

export const playerItemUpdateRequestBody = z.object({
	character_id: z.string(),
	updateData: playerItem.merge(idSchema).array().nonempty()
});
export type PlayerItemUpdateRequestBody = z.infer<typeof playerItemUpdateRequestBody>;
