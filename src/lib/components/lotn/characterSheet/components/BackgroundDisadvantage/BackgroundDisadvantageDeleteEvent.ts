import type { BackgroundDisadvantageName } from '$lib/zod/lotn/enums/backgroundDisadvantageName';

export type BackgroundDisadvantageDeleteEvent = {
	id: string;
	disadvantageName: BackgroundDisadvantageName;
};
