import { z } from 'zod';

export const moralityName = z.enum([
	'Humanity',
	'Path of Blood',
	'Path of Caine',
	'Path of Cathari',
	'Path of Chivalry',
	'Path of Death & the Soul',
	'Path of Ecstasy',
	'Path of Entelechy',
	'Path of Evil Revelations',
	'Path of Feral Heart',
	'Path of Harmony',
	'Path of Heaven',
	'Path of Honorable Accord',
	'Path of Lilith',
	'Path of Metamorphosis',
	'Path of Night',
	'Path of Nocturnal Redemption',
	'Path of Orion',
	'Path of Paradox',
	'Path of Power & the Inner Voice',
	'Path of Scorched Heart',
	'Path of the Hive',
	'Path of Typhon-Set'
]);
export type MoralityName = z.infer<typeof moralityName>;
