import { z } from 'zod';

export const proteanShapechangeOption = z.enum([
	'Fast',
	'Slippery',
	'Climber',
	'Swimmer',
	'Night Vision',
	'Smell'
]);
export type ProteanShapechangeOption = z.infer<typeof proteanShapechangeOption>;
