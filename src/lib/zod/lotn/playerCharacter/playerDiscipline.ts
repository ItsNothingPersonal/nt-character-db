import { z } from 'zod';
import { animalism } from '../disciplines/animalism';
import { auspex } from '../disciplines/auspex';
import { bloodSorcery } from '../disciplines/bloodSorcery';
import { celerity } from '../disciplines/celerity';
import { dominate } from '../disciplines/dominate';
import { fortitude } from '../disciplines/fortitude';
import { obfuscate } from '../disciplines/obfuscate';
import { potence } from '../disciplines/potence';
import { presence } from '../disciplines/presence';
import { protean } from '../disciplines/protean';
import { thinBloodAlchemy } from '../disciplines/thinBloodAlchemy';

export const playerDiscipline = z.discriminatedUnion('name', [
	animalism,
	auspex,
	bloodSorcery,
	celerity,
	dominate,
	fortitude,
	obfuscate,
	potence,
	presence,
	protean,
	thinBloodAlchemy
]);

export type PlayerDiscipline = z.infer<typeof playerDiscipline>;

export const playerDisciplineSingleRequestBodyDB = z.object({
	discipline: playerDiscipline,
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerDisciplineSingleRequestBodyDB = z.infer<
	typeof playerDisciplineSingleRequestBodyDB
>;

export const playerDisciplineRequestBodyDB = z.object({
	id: z.string().optional(),
	character_id: z.string(),
	disciplines: playerDiscipline.array().nonempty()
});
export type PlayerDisciplineRequestBodyDB = z.infer<typeof playerDisciplineRequestBodyDB>;
