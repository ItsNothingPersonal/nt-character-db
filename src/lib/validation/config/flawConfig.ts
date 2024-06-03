import type { FlawName } from '$lib/zod/classic/enums/flawName';
import type { AdvantageConfigBody } from '$lib/zod/classic/validation/advantageConfigBody';

export const flawConfig = new Map<FlawName, AdvantageConfigBody>([
	['Derangement', { cost: 2 }],
	['Intolerance', { cost: 1 }],
	[
		'Uncontrollable',
		{
			cost: 3,
			condition: (e) => {
				return e.clan === 'Brujah';
			}
		}
	]
]);
