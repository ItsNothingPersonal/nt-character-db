import { z } from 'zod';
import { characterStatus } from '../enums/characterStatus';
import { clanName } from '../enums/clanName';
import { predatorType } from '../enums/predatorType';

export const playerCharacterBase = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(9).max(16),
	predatorType: predatorType,
	bloodPotency: z.number().min(0).max(7),
	status: characterStatus.readonly()
});
export type PlayerCharacterBase = z.infer<typeof playerCharacterBase>;

export const playerCharacterBaseCreate = z.object({
	id: z.string().default('-1'),
	name: z.string().optional(),
	clan: clanName.optional(),
	generation: z.number().min(9).max(16).default(13),
	predatorType: predatorType.optional(),
	bloodPotency: z.number().min(0).max(7).default(0),
	status: characterStatus.default('draft').readonly()
});
export type PlayerCharacterBaseCreate = z.infer<typeof playerCharacterBaseCreate>;

export const playerCharacterBaseCreateRequestBody = z.object({
	name: z.string(),
	clan: clanName,
	generation: z.number().min(9).max(16),
	predatorType: predatorType,
	bloodPotency: z.number().min(0).max(7)
});
export type PlayerCharacterBaseCreateRequestBody = z.infer<
	typeof playerCharacterBaseCreateRequestBody
>;

export const playerCharacterBaseCreateRequestBodyDB = playerCharacterBaseCreateRequestBody.extend({
	id: z.string().optional(),
	user: z.string().optional(),
	status: characterStatus.default('draft')
});
export type PlayerCharacterBaseCreateRequestBodyDB = z.infer<
	typeof playerCharacterBaseCreateRequestBodyDB
>;

export const playerCharacterBaseDeleteRequestBody = z.object({
	id: z.string()
});
export type PlayerCharacterBaseDeleteRequestBody = z.infer<
	typeof playerCharacterBaseDeleteRequestBody
>;
