import type { LoresheetName } from '$lib/zod/lotn/enums/loresheetName';
import { meritName } from '$lib/zod/lotn/enums/meritName';
import { loresheetConfig } from '../config/loresheetConfig';

export function checkForFixedBackgrounds(
	loresheet: LoresheetName,
	level: 'level1' | 'level2' | 'level3'
) {
	return (loresheetConfig[loresheet][level].changes ?? []).filter(
		(e) => e.kind === 'Background' && e.fixed === true
	);
}

export function checkForDotBonusBackgrounds(
	loresheet: LoresheetName,
	level: 'level1' | 'level2' | 'level3'
) {
	return (loresheetConfig[loresheet][level].changes ?? []).filter(
		(e) => e.kind === 'Background' && e.fixed !== true
	);
}

export function checkForMerits(loresheet: LoresheetName, level: 'level1' | 'level2' | 'level3') {
	return (loresheetConfig[loresheet][level].changes ?? []).filter(
		(e) => e.kind === 'Merit' && meritName.safeParse(e.name).success
	);
}
