import type { ClanName } from '$lib/zod/lotn/enums/clanName';
import type { DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
import { clanConfig } from '../config/clanConfig';

export function isInClan(clan: ClanName, discipline: DisciplineName) {
	return clanConfig[clan].inclan.includes(discipline);
}
