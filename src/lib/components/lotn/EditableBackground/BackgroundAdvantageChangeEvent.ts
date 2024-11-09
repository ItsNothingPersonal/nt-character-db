import type { BackgroundAdvantageName } from '$lib/zod/lotn/enums/backgroundAdvantageName';
import type { BackgroundName } from '$lib/zod/lotn/enums/backgroundName';

export type BackgroundAdvantageChangeEvent = {
	backgroundId: string;
	backgroundName: BackgroundName;
	advantageId: string;
	name: BackgroundAdvantageName | undefined;
	value: number | undefined;
};
