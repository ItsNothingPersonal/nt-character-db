import type { BackgroundDisadvantageName } from '$lib/zod/lotn/enums/backgroundDisadvantageName';

export type BackgroundDisadvantageChangeEvent = {
	backgroundId: string;
	name: BackgroundDisadvantageName | undefined;
	value: number | undefined;
};
