import { z } from 'zod';

export const celerityPowers = z.enum([
	"Cat's Grace",
	'Quicksilver',
	'Fleetness',
	'Rapid Reflexes',
	'Blink',
	'Nimble Departure',
	'Unerring Aim',
	'Velocity',
	'Zephyr',
	'Bulletstorm',
	'Lightning Strike'
]);
export type CelerityPowers = z.infer<typeof celerityPowers>;
