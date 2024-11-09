import { z } from 'zod';
import { backgroundAdvantageName } from '../enums/backgroundAdvantageName';
import { backgroundName } from '../enums/backgroundName';
import { clanName } from '../enums/clanName';
import { loresheetName, type LoresheetName } from '../enums/loresheetName';
import { meritName } from '../enums/meritName';
import { sectName } from '../enums/sectName';
import { skillName } from '../enums/skillName';
import { spheresOfInfluenceName } from '../enums/spheresOfInfluenceName';

const associatedAdvantage = z.object({
	name: backgroundAdvantageName.or(z.literal('Variabel')),
	value: z.number()
});
export type AssociatedAdvantage = z.infer<typeof associatedAdvantage>;

const loresheetChangeEntry = z.object({
	kind: z.literal('Background').or(z.literal('Merit')).or(z.literal('Skill')),
	name: backgroundName.or(skillName).or(meritName).or(backgroundName.array()).or(skillName.array()),
	combination: z.enum(['and', 'or']).default('and').optional(),
	value: z.number().min(1),
	fixed: z.boolean().default(false).optional(),
	sphereOfInfluence: spheresOfInfluenceName.optional(),
	associatedAdvantages: associatedAdvantage.array().optional()
});
export type LoresheetChangeEntry = z.infer<typeof loresheetChangeEntry>;

export const loresheetAdvantageEntry = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	changes: loresheetChangeEntry.array().optional()
});
export type LoresheetAdvantageEntry = z.infer<typeof loresheetAdvantageEntry>;

const loresheetConfigMapValueSchema = z.object({
	name: loresheetName,
	description: z.string().min(1),
	level1: loresheetAdvantageEntry,
	level2: loresheetAdvantageEntry,
	level3: loresheetAdvantageEntry,
	prerequisite: clanName.or(sectName).optional()
});
export type LoresheetConfigMapValueSchema = z.infer<typeof loresheetConfigMapValueSchema>;

const loresheetConfigMapValueMetaSchema = z.object(
	loresheetName.options.reduce(
		(acc, key) => {
			acc[key] = loresheetConfigMapValueSchema;
			return acc;
		},
		{} as { [K in LoresheetName]: typeof loresheetConfigMapValueSchema }
	)
);

export const loresheetConfigMap = z.record(loresheetName, loresheetConfigMapValueMetaSchema);
export type LoresheetConfigMap = z.infer<typeof loresheetConfigMapValueMetaSchema>;
