import { z } from 'zod';
import { attributeName } from './enums/attributeName';
import { backgroundAdvantageName } from './enums/backgroundAdvantageName';
import { backgroundDisadvantageName } from './enums/backgroundDisadvantageName';
import { backgroundName, type BackgroundName } from './enums/backgroundName';
import { bloodSorceryRitualName } from './enums/bloodSorceryRitualName';
import { clanName } from './enums/clanName';
import { disciplineAttributeType } from './enums/disciplineAttributeType';
import { disciplineName } from './enums/disciplineName';
import { animalismPowers } from './enums/disciplinePowers/animalismPowers';
import { auspexPowers } from './enums/disciplinePowers/auspexPowers';
import { bloodSorceryPowers } from './enums/disciplinePowers/bloodSorceryPowers';
import { celerityPowers } from './enums/disciplinePowers/celerityPowers';
import { dominatePowers } from './enums/disciplinePowers/dominatePowers';
import { fortitudePowers } from './enums/disciplinePowers/fortitudePowers';
import { obfuscatePowers } from './enums/disciplinePowers/obfuscatePowers';
import { oblivionPowers } from './enums/disciplinePowers/oblivionPowers';
import { potencePowers } from './enums/disciplinePowers/potencePowers';
import { presencePowers } from './enums/disciplinePowers/presencePowers';
import { proteanPowers } from './enums/disciplinePowers/proteanPowers';
import { thinBloodAlchemyPowers } from './enums/disciplinePowers/thinBloodAlchemyPowers';
import { flawName } from './enums/flawName';
import { masqueradeThreat } from './enums/masqueradeThreat';
import { meritFlawCategory } from './enums/meritFlawCategory';
import { meritName } from './enums/meritName';
import { oblivionCeremonyName } from './enums/oblivionCeremonyName';
import { skillName } from './enums/skillName';
import { backgroundAvantageConfig } from './playerCharacter/playerBackgroundAdvantage';
import { backgroundDisadvantageConfig } from './playerCharacter/playerBackgroundDisdvantage';

export function createDisciplineConfigSchema(
	disciplineNameValue: NormalDisciplines | RitualDisciplines
) {
	// Determine if the disciplineNameValue is a normal discipline
	const isNormal = isNormalDiscipline(disciplineNameValue);

	// Create a base schema without the `powers` property
	const baseSchema = z.object({
		name: z.literal(disciplineNameValue),
		characteristics: z.object({
			type: disciplineAttributeType.or(extendedDisciplineType).refine((data) => {
				if (typeof data === 'object' && 'hint' in data) {
					return extendedDisciplineType.safeParse(data).success;
				}
				return disciplineAttributeType.safeParse(data).success;
			}),
			masqueradeThreat: masqueradeThreatSchema,
			bloodResonance: z.enum([
				'Sanguine',
				'Melancholic',
				'Choleric',
				'Phlegmatic',
				'Animal blood',
				'Non-animal blood devoid of Resonance',
				'Variable'
			]),
			description: z.string().optional()
		})
	});

	// Extend the base schema with the appropriate `powers` type
	if (isNormal) {
		return baseSchema.extend({
			powers: createNormalDisciplinePowerSchema(disciplineNameValue)
		});
	} else {
		return baseSchema.extend({
			powers: createRitualPowerSchema(disciplineNameValue)
		});
	}
}

const extendedDisciplineType = z.object({ text: disciplineAttributeType, hint: z.string() });

export const masqueradeThreatSchema = z.object({
	type: masqueradeThreat,
	description: z.string().optional()
});
export type MasqueradeThreatSchema = z.infer<typeof masqueradeThreatSchema>;

export const normalDisciplines = disciplineName.exclude(['Thin-Blood Alchemy']);
export type NormalDisciplines = z.infer<typeof normalDisciplines>;
export const ritualDisciplines = disciplineName.extract(['Thin-Blood Alchemy']);
export type RitualDisciplines = z.infer<typeof ritualDisciplines>;

export const normalDisciplineEnum = disciplineName.exclude(['Thin-Blood Alchemy']);
export const ritualDisciplineEnum = disciplineName.extract(['Thin-Blood Alchemy']);

export const disciplineRecord: Record<NormalDisciplines, NormalDisciplinePowers> = {
	Animalism: animalismPowers,
	Auspex: auspexPowers,
	'Blood Sorcery': bloodSorceryPowers,
	Celerity: celerityPowers,
	Dominate: dominatePowers,
	Fortitude: fortitudePowers,
	Obfuscate: obfuscatePowers,
	Oblivion: oblivionPowers,
	Potence: potencePowers,
	Presence: presencePowers,
	Protean: proteanPowers
};

export const ritualsRecord: Record<RitualDisciplines, RitualDisciplinePowers> = {
	'Thin-Blood Alchemy': thinBloodAlchemyPowers
};

export function isNormalDiscipline(value: unknown): value is NormalDisciplines {
	return normalDisciplineEnum.safeParse(value).success;
}

export type NormalDisciplinePowers =
	| typeof animalismPowers
	| typeof auspexPowers
	| typeof bloodSorceryPowers
	| typeof celerityPowers
	| typeof dominatePowers
	| typeof fortitudePowers
	| typeof obfuscatePowers
	| typeof oblivionPowers
	| typeof potencePowers
	| typeof presencePowers
	| typeof proteanPowers;

export type RitualDisciplinePowers = typeof thinBloodAlchemyPowers;

export const normalDisciplinePowerUnion = z.union([
	animalismPowers,
	auspexPowers,
	bloodSorceryPowers,
	celerityPowers,
	dominatePowers,
	fortitudePowers,
	obfuscatePowers,
	oblivionPowers,
	potencePowers,
	presencePowers,
	proteanPowers
]);
export type NormalDisciplinePowerUnion = z.infer<typeof normalDisciplinePowerUnion>;

export const ritualDisciplinePowerUnion = thinBloodAlchemyPowers;
export type RitualDisciplinePowerUnion = z.infer<typeof ritualDisciplinePowerUnion>;

export function isNormalDisciplinePower(value: unknown): value is NormalDisciplinePowers {
	return normalDisciplinePowerUnion.safeParse(value).success;
}

export const idSchema = z.object({ id: z.string() });

export function createRitualPowerSchema(disciplineNameValue: RitualDisciplines) {
	return z.record(ritualsRecord[disciplineNameValue], createRitualPowerEntrySchema());
}

export function createRitualPowerEntrySchema() {
	return z.object({
		level: z.number().min(1).max(5),
		requiredIngredients: z.string().array(),
		suggestedIngredients: z.string().array(),
		cost: z.enum([
			'One Rouse check',
			'As per the counterfeited power',
			'Free aside from the distillation costs',
			'None'
		]),
		challengePool: z
			.object({
				attacker: z.object({ attribute: attributeName, skill: skillName }),
				defender: z
					.object({ attribute: attributeName, skillOrAttribute: skillName.or(attributeName) })
					.or(z.string()),
				hint: z.string().optional()
			})
			.optional(),
		system: z.string(),
		duration: z.string(),
		amalgam: z.object({ name: disciplineName, value: z.number() }).optional(),
		hint: z.string().optional(),
		hasDescription: z.boolean().default(false).optional()
	});
}

export function createNormalDisciplinePowerSchema(disciplineNameValue: NormalDisciplines) {
	return z.record(
		disciplineRecord[disciplineNameValue],
		createNormalDisciplinePowerEntrySchema(disciplineNameValue)
	);
}

export function createNormalDisciplinePowerEntrySchema(disciplineNameValue: NormalDisciplines) {
	return z.object({
		level: z.number().min(1).max(5),
		prerequisite: disciplineRecord[disciplineNameValue]
			.or(
				disciplineRecord[disciplineNameValue].array().or(
					z.object({
						main: disciplineRecord[disciplineNameValue],
						or: disciplineRecord[disciplineNameValue].array()
					})
				)
			)
			.optional(),
		amalgam: z.object({ name: disciplineName, value: z.number() }).optional(),
		cost: z.enum(['One Rouse check']).or(z.string()),
		duration: z.string(),
		challengePool: z
			.object({
				attacker: z.object({ attribute: attributeName, skill: skillName }),
				defender: z
					.object({ attribute: attributeName, skillOrAttribute: skillName.or(attributeName) })
					.or(z.string()),
				hint: z.string().optional()
			})
			.optional(),
		system: z.string(),
		hint: z.string().optional(),
		hasDescription: z.boolean().default(false).optional()
	});
}

export function createRitualSchema() {
	return z.object({
		name: z.literal('Blood Sorcery Rituals'),
		characteristics: z.object({
			description: z.string(),
			wards: z.string(),
			wardingCircles: z.string()
		}),
		rituals: z.record(
			bloodSorceryRitualName,
			z.object({
				level: z.number().min(1).max(5),
				prerequisite: bloodSorceryPowers.optional(),
				ingredients: z.string().array(),
				process: z.string().optional(),
				challengePool: z
					.object({
						attacker: z.object({ attribute: attributeName, skill: skillName }),
						defender: z
							.object({ attribute: attributeName, skillOrAttribute: skillName.or(attributeName) })
							.or(z.string()),
						hint: z.string().optional()
					})
					.optional(),
				system: z.string().optional(),
				processAndSystem: z.string().optional(),
				duration: z.string()
			})
		)
	});
}

export function createCeremoniesSchema() {
	return z.object({
		name: z.literal('Oblivion Ceremonies'),
		characteristics: z.string(),
		ceremonies: z.record(
			oblivionCeremonyName,
			z.object({
				level: z.number().min(1).max(5),
				ingredients: z.string().array(),
				process: z.string(),
				system: z.string(),
				statblock: z
					.object({
						name: z.string(),
						description: z.string()
					})
					.optional(),
				duration: z.string()
			})
		)
	});
}

export function createBackgroundConfigSchema(background: BackgroundName) {
	return z.object({
		name: z.literal(background),
		description: z.string(),
		level1: z.string(),
		level2: z.string(),
		level3: z.string(),
		advantages: z.record(backgroundAdvantageName, backgroundAvantageConfig).optional(),
		disadvantages: z.record(backgroundDisadvantageName, backgroundDisadvantageConfig).optional()
	});
}

export function createMeritsSchema() {
	return z.record(
		meritName,
		z
			.object({
				name: meritName,
				level1: z.string().optional(),
				level2: z.string().optional(),
				level3: z.string().optional(),
				level4: z.string().optional(),
				level5: z.string().optional(),
				prerequisite: z
					.object({
						name: backgroundName.or(z.literal('Blood Potency')),
						value: z.number().min(0).max(3)
					})
					.or(clanName)
					.array()
					.or(
						z
							.object({
								name: backgroundName.or(z.literal('Blood Potency')),
								value: z.number().min(0).max(3)
							})
							.or(clanName)
					)
					.optional(),
				ghoulAllowed: z.boolean().default(false).optional(),
				category: meritFlawCategory,
				linkedSkills: z.enum(['Academics', 'Crafts', 'Performance']).array().optional(),
				hasSpecificDescription: z.boolean().default(false).optional(),
				multiPurchase: z.boolean().default(false).optional(),
				max: z.number().min(1).max(5).optional()
			})
			.or(
				z.object({
					name: meritName,
					levelVariable: z.string(),
					min: z.number().min(1).max(5).optional(),
					max: z.number().min(1).max(5).optional(),
					prerequisite: z
						.object({
							name: backgroundName,
							value: z.number().min(0).max(3)
						})
						.or(clanName)
						.array()
						.optional(),
					ghoulAllowed: z.boolean().default(false).optional(),
					category: meritFlawCategory,
					linkedSkills: z.enum(['Academics', 'Crafts', 'Performance']).array().optional(),
					hasSpecificDescription: z.boolean().default(false).optional(),
					multiPurchase: z.boolean().default(false).optional()
				})
			)
	);
}

export function createFlawsSchema() {
	return z.record(
		flawName,
		z
			.object({
				name: flawName,
				description: z.string().optional(),
				level1: z.string().optional(),
				level2: z.string().optional(),
				level3: z.string().optional(),
				level4: z.string().optional(),
				level5: z.string().optional(),
				prerequisite: z
					.object({
						name: backgroundName.or(z.literal('Blood Potency')),
						value: z.number().min(0).max(3).default(0)
					})
					.optional(),
				ghoulAllowed: z.boolean().default(false).optional(),
				category: meritFlawCategory,
				hasSpecificDescription: z.boolean().default(false).optional(),
				multiPurchase: z.boolean().default(false).optional()
			})
			.or(
				z.object({
					name: flawName,
					levelVariable: z.string(),
					min: z.number().min(1).max(5),
					max: z.number().min(1).max(5),
					prerequisite: z
						.object({
							name: backgroundName.or(z.literal('Blood Potency')),
							value: z.number().min(0).max(3).default(0)
						})
						.optional(),
					ghoulAllowed: z.boolean().default(false).optional(),
					category: meritFlawCategory,
					hasSpecificDescription: z.boolean().default(false).optional(),
					multiPurchase: z.boolean().default(false).optional()
				})
			)
	);
}
