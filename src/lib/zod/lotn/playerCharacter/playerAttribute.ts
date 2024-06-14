import { z } from 'zod';

export const playerAttribute = z.object({
	physical_strength: z.number().min(1).max(5),
	physical_dexterity: z.number().min(1).max(5),
	physical_stamina: z.number().min(1).max(5),
	social_charisma: z.number().min(1).max(5),
	social_manipulation: z.number().min(1).max(5),
	social_composure: z.number().min(1).max(5),
	mental_intelligence: z.number().min(1).max(5),
	mental_wits: z.number().min(1).max(5),
	mental_resolve: z.number().min(1).max(5)
});

export type PlayerAttribute = z.infer<typeof playerAttribute>;

export const playerAttributeCreate = z.object({
	physical_strength: z.number().min(1).max(5).default(1),
	physical_dexterity: z.number().min(1).max(5).default(1),
	physical_stamina: z.number().min(1).max(5).default(1),
	social_charisma: z.number().min(1).max(5).default(1),
	social_manipulation: z.number().min(1).max(5).default(1),
	social_composure: z.number().min(1).max(5).default(1),
	mental_intelligence: z.number().min(1).max(5).default(1),
	mental_wits: z.number().min(1).max(5).default(1),
	mental_resolve: z.number().min(1).max(5).default(1)
});

export type PlayerAttributeCreate = z.infer<typeof playerAttributeCreate>;

export const playerAttributeRequestBodyDB = playerAttribute.extend({
	id: z.string().optional(),
	character_id: z.string()
});
export type PlayerAttributeRequestBodyDB = z.infer<typeof playerAttributeRequestBodyDB>;
