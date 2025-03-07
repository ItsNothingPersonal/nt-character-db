import { projectName } from '$lib/zod/projectName';
import { z } from 'zod';
import { characterStatus } from '../enums/characterStatus';
import { clanName } from '../enums/clanName';
import { predatorType } from '../enums/predatorType';
import { sectName } from '../enums/sectName';

export const playerCharacterBase = z.object({
	id: z.string(),
	clan: clanName,
	generation: z.number().min(9).max(16),
	predatorType: predatorType,
	bloodPotency: z.number().min(0).max(7),
	sect: sectName,
	status: characterStatus.readonly(),
	ghoul: z.boolean(),
	name: z.string().min(1).max(30),
	project: projectName
});
export type PlayerCharacterBase = z.infer<typeof playerCharacterBase>;

export const playerCharacterBaseCreate = z.object({
	clan: clanName.default('Banu Haqim'),
	generation: z.number().min(9).max(16).default(12),
	predatorType: predatorType.optional(),
	bloodPotency: z.number().min(0).max(7).default(1),
	sect: sectName.optional(),
	status: characterStatus.default('draft').readonly(),
	ghoul: z.boolean().default(false),
	name: z.string().min(1).max(30),
	project: projectName
});
export type PlayerCharacterBaseCreate = z.infer<typeof playerCharacterBaseCreate>;

export const playerCharacterBaseCreateRequestBody = z.object({
	clan: clanName,
	generation: z.number().min(9).max(16),
	predatorType: predatorType,
	bloodPotency: z.number().min(0).max(7),
	sect: sectName,
	status: characterStatus.readonly(),
	ghoul: z.boolean(),
	name: z.string().min(1).max(30),
	project: projectName
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
