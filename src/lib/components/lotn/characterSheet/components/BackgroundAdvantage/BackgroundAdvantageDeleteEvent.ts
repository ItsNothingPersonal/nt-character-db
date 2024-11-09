import type { BackgroundAdvantageName } from '$lib/zod/lotn/enums/backgroundAdvantageName';

export type BackgroundAdvantageDeleteEvent = {
	id: string;
	advantageName: BackgroundAdvantageName;
};
