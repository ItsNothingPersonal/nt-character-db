import type { ClanName } from '$lib/zod/enums/clanName';
import type { DisciplineName } from '$lib/zod/enums/disciplineName';

export const inClanDisciplineConfig = new Map<ClanName, DisciplineName[]>([
	['Brujah', ['Celerity', 'Potence', 'Presence']],
	['Ventrue', ['Dominate', 'Fortitude', 'Presence']]
]);
