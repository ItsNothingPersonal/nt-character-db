import { z } from 'zod';

export const thinBloodAlchemyPowers = z.enum([
	'Far Reach',
	'Haze',
	'Counterfeit Power (Level 1)',
	'Envelop',
	'Counterfeit (Level 2)',
	'Defractionate',
	'Counterfeit (Level 3)',
	'Airborne Momentum',
	'Counterfeit (Level 4)',
	'Awaken the Sleeper',
	'Horrid Form',
	'Heart of Darkness',
	'Form of Mist',
	'Shape Mastery'
]);
