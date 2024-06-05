import { z } from 'zod';

export const backgroundAdvantageName = z.enum([
	"At Arm's Length",
	'Diversity',
	'Reliable',
	'Fan Club',
	'Star Power',
	'Armory',
	'Cell',
	'Garage',
	'Laboratory',
	'Library',
	'Location',
	'Luxury',
	'Elaborate',
	'Security',
	'Surgical Ward',
	'Walk-In Freezer',
	'Guards',
	'Workshop',
	'Zoo',
	'Friendly',
	'Flavor Station',
	'Open Bar',
	'Cash Money',
	'Cryptocurrency',
	'Liquidity',
	'Wall Street Wizard'
]);
export type BackgroundAdvantageName = z.infer<typeof backgroundAdvantageName>;
