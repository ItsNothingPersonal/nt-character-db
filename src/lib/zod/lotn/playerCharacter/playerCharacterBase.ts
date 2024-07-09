import { z } from 'zod';
import { characterStatus } from '../enums/characterStatus';
import { clanName } from '../enums/clanName';
import { predatorType } from '../enums/predatorType';
import { sectName } from '../enums/sectName';

export const playerCharacterBase = z.object({
	id: z.string(),
	name: z.string(),
	clan: clanName,
	generation: z.number().min(9).max(16),
	predatorType: predatorType,
	bloodPotency: z.number().min(0).max(7),
	sect: sectName,
	status: characterStatus.readonly()
});
export type PlayerCharacterBase = z.infer<typeof playerCharacterBase>;

export const playerCharacterBaseCreate = z.object({
	name: z.string().optional(),
	clan: clanName.optional(),
	generation: z.number().min(9).max(16).default(13),
	predatorType: predatorType.optional(),
	bloodPotency: z.number().min(0).max(7).default(0),
	sect: sectName.optional(),
	status: characterStatus.default('draft').readonly()
});
export type PlayerCharacterBaseCreate = z.infer<typeof playerCharacterBaseCreate>;

export const playerCharacterBaseCreateRequestBody = z.object({
	name: z.string(),
	clan: clanName,
	generation: z.number().min(9).max(16),
	predatorType: predatorType,
	bloodPotency: z.number().min(0).max(7),
	sect: sectName
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

export const playerCharacterBaseUpdateRequestBody = z.object({
	id: z.string(),
	updateData: playerCharacterBaseCreateRequestBody.partial()
});
export type PlayerCharacterBaseUpdateRequestBody = z.infer<
	typeof playerCharacterBaseUpdateRequestBody
>;
