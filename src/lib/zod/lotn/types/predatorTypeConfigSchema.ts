import { z } from 'zod';
import { attributeName } from '../enums/attributeName';
import { backgroundAdvantageName } from '../enums/backgroundAdvantageName';
import { backgroundName } from '../enums/backgroundName';
import { flawName } from '../enums/flawName';
import { meritName } from '../enums/meritName';
import { predatorType, type PredatorType } from '../enums/predatorType';
import { skillName } from '../enums/skillName';
import { spheresOfInfluenceName } from '../enums/spheresOfInfluenceName';

export const predatorTypeChange = z.object({
	style: z.enum(['add', 'remove']),
	kind: z.enum(['Humanity', 'Background', 'Merit', 'Flaw']),
	name: backgroundName.or(meritName).or(flawName).or(backgroundName.array()).optional(),
	sphereOfInfluence: spheresOfInfluenceName.array().optional(),
	flawKind: z
		.enum([
			'Bonding',
			'Connection',
			'Feeding',
			'Ghoul',
			'Mythical',
			'Physical',
			'Psychological',
			'Thin-Blood'
		])
		.optional(),
	value: z.number(),
	associatedAdvantage: z
		.object({
			name: backgroundAdvantageName.optional(),
			value: z.number(),
			mayUseParentValue: z.boolean().optional()
		})
		.optional(),
	description: z.string().optional(),
	multiPurchase: z.boolean().optional()
});
export type PredatorTypeChange = z.infer<typeof predatorTypeChange>;

const huntingPoolSchema = z.union([
	z.tuple([attributeName, skillName]),
	z.object({
		type: z.literal('Special'),
		description: z.string()
	})
]);

const predatorTypeConfigMapValueSchema = z.object({
	description: z.string(),
	huntingPool: huntingPoolSchema,
	changeDescription: z.string(),
	changes: z.array(predatorTypeChange),
	maxBloodPotency: z.number().optional()
});
export type PredatorTypeConfigMapValueSchema = z.infer<typeof predatorTypeConfigMapValueSchema>;

const predatorTypeConfigMapValueMetaSchema = z.object(
	predatorType.options.reduce(
		(acc, key) => {
			acc[key] = predatorTypeConfigMapValueSchema;
			return acc;
		},
		{} as { [K in PredatorType]: typeof predatorTypeConfigMapValueSchema }
	)
);

export const predatorTypeConfigMap = z.record(predatorType, predatorTypeConfigMapValueMetaSchema);
export type PredatorTypeConfigMap = z.infer<typeof predatorTypeConfigMapValueMetaSchema>;
