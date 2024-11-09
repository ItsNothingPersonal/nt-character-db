import { z } from 'zod';
import { backgroundAdvantageName } from '../enums/backgroundAdvantageName';
import { backgroundName } from '../enums/backgroundName';
import { loresheetName } from '../enums/loresheetName';
import { predatorType } from '../enums/predatorType';
import { predatorTypeChange } from './predatorTypeConfigSchema';

export const pointsRecordSchemaEntry = z.object({
	name: z.string().or(z.array(z.string())),
	current: z.number().default(0),
	max: z.number().default(0),
	associatedAdvantage: z
		.object({
			name: z.string(),
			current: z.number().default(0),
			max: z.number().default(0),
			mayUseParentDots: z.boolean().default(false)
		})
		.optional()
});
export type PointsRecordSchemaEntry = z.infer<typeof pointsRecordSchemaEntry>;
/**
 * 3 Arten von Zöhlern:
 * 1. Predator Type
 *  - Kann mehrere Einträge (je einen pro "Change" mit type "Background" aus dem Predator Typ) haben, z.B. Zähler für verschiedene Hintergründe (optional mit Zählern für die dazugehörigen Vorteile/Advantages)
 * 2. Loresheets
 *  - Kann mehree Einträge haben, z.B. Zähler für verschiedene Hintergründe (optional mit Zählern für die dazugehörigen Vorteile/Advantages)
 * 3. Free Dots
 *  - Ein Zähler für freie Punkte, die überall eingesetzt werden können
 *
 * Jeder Zähler muss
 */
export const backgroundPointsRecordStore = z.object({
	predatorType: z.object({ name: predatorType, changes: predatorTypeChange.array() }),
	loresheet: z
		.object({
			name: loresheetName,
			dots: z
				.object({
					name: backgroundName.or(backgroundName.array()),
					max: z.number(),
					associatedAdvantage: z
						.object({ name: backgroundAdvantageName, max: z.number() })
						.optional()
				})
				.array()
		})
		.optional(),
	freeDots: z.number().default(7),
	changes: z.array(
		z.object({
			id: z.string(),
			freeDots: z.number(),
			predatorType: z.number(),
			associatedAdvantage: z
				.object({
					advantage: z.number(),
					freeDots: z.number()
				})
				.optional()
		})
	)
});
export type BackgroundPointsRecordStore = z.infer<typeof backgroundPointsRecordStore>;

export const pointsRecordSchema = z.object({
	predatorType: z
		.object({
			name: predatorType,
			dots: z.array(pointsRecordSchemaEntry),
			associatedAdvantage: z
				.object({
					name: z.string(),
					current: z.number().default(0),
					max: z.number().default(0)
				})
				.optional()
		})
		.default({ name: 'Alleycat', dots: [] }),
	freeDots: z
		.object({
			current: z.number(),
			max: z.number()
		})
		.default({ current: 0, max: 7 }),
	changes: z
		.array(
			z.object({
				id: z.string(),
				freeDots: z.number(),
				predatorType: z.number(),
				associatedAdvantage: z
					.object({
						advantage: z.number(),
						freeDots: z.number()
					})
					.optional()
			})
		)
		.default([])
});
export type PointsRecordSchema = z.infer<typeof pointsRecordSchema>;
