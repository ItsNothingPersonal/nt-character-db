import type { ItemQualityName } from '$lib/zod/lotn/enums/itemQualityName';
import type { ItemTypeName } from '$lib/zod/lotn/enums/itemTypeName';
import { itemQualityConfig } from '../config/itemQualityConfig';

export function getItemQualityDescription(quality: ItemQualityName, type: ItemTypeName) {
	return itemQualityConfig[quality].find((item) => item.type === type)?.description;
}
