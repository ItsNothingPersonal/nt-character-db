import { z } from 'zod';

export const attackerPosition = z.enum([
	'attackerMoreThanThreeMetersAway',
	'attackerLessThanTwoMetersAway',
	'mediumRange'
]);
export type AttackerPosition = z.infer<typeof attackerPosition>;
