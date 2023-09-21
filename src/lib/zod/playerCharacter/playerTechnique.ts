import { z } from 'zod';
import { techniqueName } from '../enums/techniqueName';

export const playerTechnique = z.object({
	name: techniqueName
});

export type PlayerTechnique = z.infer<typeof playerTechnique>;
