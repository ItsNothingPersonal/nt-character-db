import { z } from 'zod';
import { backgroundAdvantageName } from './enums/backgroundAdvantageName';
import { backgroundDisadvantageName } from './enums/backgroundDisadvantageName';
import { backgroundName, type BackgroundName } from './enums/backgroundName';
import { bloodSorceryRitualName } from './enums/bloodSorceryRitualName';
import { clanName } from './enums/clanName';
import { disciplineAttributeType } from './enums/disciplineAttributeType';
import { disciplineName, type DisciplineName } from './enums/disciplineName';
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
import { loresheetName } from './enums/loresheetName';
import { masqueradeThreat } from './enums/masqueradeThreat';
import { meritName } from './enums/meritName';
import { oblivionCeremonyName } from './enums/oblivionCeremonyName';
import { sectName } from './enums/sectName';

export function createDisciplineConfigSchema(
	disciplineNameValue: NormalDisciplines | RitualDisciplines
) {
	return z.object({
		name: z.literal(disciplineNameValue),
		characteristics: z.object({
			type: disciplineAttributeType.or(
				z.object({ type: disciplineAttributeType, hint: z.string() })
			),
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
		}),
		powers: !isNormalDiscipline(disciplineNameValue)
			? createRitualPowerSchema(disciplineNameValue)
			: createNormalDisciplinePowerSchema(disciplineNameValue)
	});
}

export const masqueradeThreatSchema = z.object({
	type: masqueradeThreat,
	description: z.string().optional()
});
export type MasqueradeThreatSchema = z.infer<typeof masqueradeThreatSchema>;

export type NormalDisciplines = Exclude<DisciplineName, 'Thin-Blood Alchemy'>;
export type RitualDisciplines = Extract<DisciplineName, 'Thin-Blood Alchemy'>;

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
	return z.record(
		ritualsRecord[disciplineNameValue],
		z.object({
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
					attacker: z.string(),
					defender: z.string(),
					hint: z.string().optional()
				})
				.optional(),
			system: z.string(),
			duration: z.string()
		})
	);
}

export function createNormalDisciplinePowerSchema(disciplineNameValue: NormalDisciplines) {
	return z.record(
		disciplineRecord[disciplineNameValue],
		z.object({
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
					attacker: z.string(),
					defender: z.string(),
					hint: z.string().optional()
				})
				.optional(),
			system: z.string()
		})
	);
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
						attacker: z.string(),
						defender: z.string(),
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
		advantages: z
			.record(
				backgroundAdvantageName,
				z.object({
					name: backgroundAdvantageName,
					description: z.string().optional(),
					level1: z.string().optional(),
					level2: z.string().optional(),
					levelVariable: z.string().optional()
				})
			)
			.optional(),
		disadvantages: z
			.record(
				backgroundDisadvantageName,
				z.object({
					name: backgroundDisadvantageName,
					prerequisite: z
						.object({
							name: backgroundName,
							value: z.number().min(1).max(3)
						})
						.optional(),
					description: z.string().optional(),
					level1: z.string().optional(),
					level2: z.string().optional()
				})
			)
			.optional()
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
						name: backgroundName,
						value: z.number().min(0).max(3)
					})
					.optional()
			})
			.or(
				z.object({
					name: meritName,
					levelVariable: z.string(),
					max: z.number().min(1).max(5),
					prerequisite: z
						.object({
							name: backgroundName,
							value: z.number().min(0).max(3)
						})
						.optional()
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
						name: backgroundName,
						value: z.literal(0)
					})
					.optional()
			})
			.or(
				z.object({
					name: flawName,
					levelVariable: z.string(),
					max: z.number().min(1).max(5)
				})
			)
	);
}

export function createLoresheetSchema() {
	return z.record(
		loresheetName,
		z.object({
			name: loresheetName,
			description: z.string().min(1),
			level1: loresheetAdvantageEntry,
			level2: loresheetAdvantageEntry,
			level3: loresheetAdvantageEntry,
			prerequisite: clanName.or(sectName).optional()
		})
	);
}

const loresheetAdvantageEntry = z.object({
	title: z.string().min(1),
	description: z.string().min(1)
});
