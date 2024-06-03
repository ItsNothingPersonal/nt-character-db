import type { MeritName } from '$lib/zod/classic/enums/meritName';
import type { AdvantageConfigBody } from '$lib/zod/classic/validation/advantageConfigBody';

export const meritConfig = new Map<MeritName, AdvantageConfigBody>([
	['Surprise Attack', { cost: 1 }],
	[
		'Bloodline: Vizier',
		{
			cost: 2,
			condition: (e) => {
				return e.clan === 'Assamite';
			},
			effect: (e) => {
				e.disciplines = [
					{ name: 'Auspex', inclan: true, value: 0 },
					{ name: 'Celerity', inclan: true, value: 0 },
					{ name: 'Quietus', inclan: true, value: 0 }
				];

				return e;
			}
		}
	],
	[
		'Breaking Point',
		{
			cost: 1,
			condition: (e) => {
				return e.clan === 'Brujah';
			}
		}
	],
	[
		'Burning Wrath',
		{
			cost: 2,
			condition: (e) => {
				return e.clan === 'Brujah';
			}
		}
	],
	[
		'Fervent Iconoclast',
		{
			cost: 3,
			condition: (e) => {
				return e.clan === 'Brujah';
			}
		}
	]
]);
