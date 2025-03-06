import isBoolean from 'lodash/isBoolean';
import { PDFCheckBox, PDFDocument, PDFDropdown, PDFTextField } from 'pdf-lib';
import { bloodPotencyConfig } from './components/lotn/config/bloodPotencyConfig';
import { clanConfig } from './components/lotn/config/clanConfig';
import { predatorTypeConfig } from './components/lotn/config/predatorTypeConfig';
import { projectsDefinition } from './components/lotn/config/projectsDefinition';
import {
	getBloodSorceryRitualLevel,
	getOblivionCeremonyLevel
} from './components/lotn/util/disciplines';
import { getProjectStartExp, parseExperienceList } from './components/lotn/util/experienceUtils';
import { splitStringIntoLines } from './components/lotn/util/generalUtils';
import type { AttributeName } from './zod/lotn/enums/attributeName';
import type { BloodSorceryRitualName } from './zod/lotn/enums/bloodSorceryRitualName';
import type { OblivionCeremonyName } from './zod/lotn/enums/oblivionCeremonyName';
import type { SkillName } from './zod/lotn/enums/skillName';
import type { PlayerBackground } from './zod/lotn/playerCharacter/playerBackground';
import { playerCharacter } from './zod/lotn/playerCharacter/playerCharacter';
import type { PlayerExperience } from './zod/lotn/playerCharacter/playerExperience';
import type { PlayerFlaw } from './zod/lotn/playerCharacter/playerFlaw';
import type { PlayerMerit } from './zod/lotn/playerCharacter/playerMerit';
import type { ProjectName } from './zod/projectName';

export const pdfTemplates: { bw: string[]; color: string[] } = {
	bw: [
		'Vampire_5thEdition_LawsOfTheNight_2-Page_BanuHaqim_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Brujah_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Caitiff_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Gangrel_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Hecata_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Lasombra_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Malkavian_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Ministry_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Nosferatu_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Ravnos_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Salubri_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_ThinBlood_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Toreador_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Tremere_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Tzimisce_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Ventrue_Interactive.pdf'
	],
	color: [
		'Vampire_5thEdition_LawsOfTheNight_2-Page_BanuHaqim_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Brujah_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Caitiff_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Gangrel_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Hecata_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Lasombra_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Malkavian_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Ministry_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Nosferatu_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Ravnos_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Salubri_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Sect_Anarch_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Sect_Ashirra_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Sect_Camarilla_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Sect_Sabbat_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_ThinBlood_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Toreador_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Tremere_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Tzimisce_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_2-Page_Ventrue_Color_Interactive.pdf',
		'Vampire_5thEdition_LawsOfTheNight_Original_2-Page_Color_Interactive.pdf'
	]
};

export async function fillPdfForm(
	pdfName: string,
	formData: Record<string, string | number | boolean>,
	color: boolean
) {
	try {
		// Load PDF from static folder
		const response = await fetch(`/pdfs/${color ? 'color' : 'bw'}/${pdfName}`);
		if (!response.ok) {
			throw new Error(`Failed to load PDF template: ${pdfName}`);
		}

		const formBytes = await response.arrayBuffer();
		const pdfDoc = await PDFDocument.load(formBytes);
		const form = pdfDoc.getForm();

		// Fill all form fields
		Object.entries(formData).forEach(([fieldName, value]) => {
			try {
				const field = form.getField(fieldName);

				if (field instanceof PDFDropdown) {
					field.select(String(value));
				} else if (field instanceof PDFTextField) {
					field.setText(String(value));
				} else if (field instanceof PDFCheckBox) {
					if (isBoolean(value) && value) {
						field.check();
					} else {
						field.uncheck();
					}
				}
			} catch {
				// Field not found in form - continue with next field
			}
		});

		// Save the PDF
		const pdfBytes = await pdfDoc.save();

		return pdfBytes;
	} catch (error) {
		console.error('Error filling PDF form:', error);
		throw error;
	}
}

export async function analyzePdfFields(pdfName: string) {
	const response = await fetch(`/pdfs/${pdfName}`);
	const formBytes = await response.arrayBuffer();
	const pdfDoc = await PDFDocument.load(formBytes);
	const form = pdfDoc.getForm();

	const fields = form.getFields();

	const results: { name: string; type: string; isReadOnly: boolean }[] = [];
	fields.forEach((field) => {
		results.push({
			name: field.getName(),
			type: field.constructor.name,
			isReadOnly: field.isReadOnly()
		});
	});
	return results;
}

export async function downloadCharacterSheet(
	characterId: string | undefined,
	color: boolean,
	pdfName: string | undefined
) {
	if (!characterId) return;
	if (!pdfName) return;

	const characterResponse = await fetch(`/api/lotn/character?id=${characterId}`);
	const character = playerCharacter.parse(await characterResponse.json());
	const [attribute, skill] = predatorTypeConfig[character.predatorType].huntingPool as [
		AttributeName,
		SkillName
	];

	try {
		const clanBane = splitStringIntoLines(clanConfig[character.clan].bane.explanation, 5);

		const formData = {
			// Basis-Daten
			name: character.name,
			clan: character.clan,
			predator: character.predatorType,
			generation: character.generation,
			chronicle: character.project,
			faction: character.sect,
			compulsion: clanConfig[character.clan].compulsion.title,

			// Attribute
			dot5b: true,
			dot6b: character.attributes.physical_strength >= 2,
			dot7b: character.attributes.physical_strength >= 3,
			dot8b: character.attributes.physical_strength >= 4,
			dot9b: character.attributes.physical_strength >= 5,
			dot13b: true,
			dot14b: character.attributes.physical_dexterity >= 2,
			dot15b: character.attributes.physical_dexterity >= 3,
			dot16b: character.attributes.physical_dexterity >= 4,
			dot17b: character.attributes.physical_dexterity >= 5,
			dot21b: true,
			dot22b: character.attributes.physical_stamina >= 2,
			dot23b: character.attributes.physical_stamina >= 3,
			dot24b: character.attributes.physical_stamina >= 4,
			dot25b: character.attributes.physical_stamina >= 5,
			dot29b: true,
			dot30b: character.attributes.social_charisma >= 2,
			dot31b: character.attributes.social_charisma >= 3,
			dot32b: character.attributes.social_charisma >= 4,
			dot33b: character.attributes.social_charisma >= 5,
			dot37b: true,
			dot38b: character.attributes.social_manipulation >= 2,
			dot39b: character.attributes.social_manipulation >= 3,
			dot40b: character.attributes.social_manipulation >= 4,
			dot41b: character.attributes.social_manipulation >= 5,
			dot45b: true,
			dot46b: character.attributes.social_composure >= 2,
			dot47b: character.attributes.social_composure >= 3,
			dot48b: character.attributes.social_composure >= 4,
			dot49b: character.attributes.social_composure >= 5,
			dot53b: true,
			dot54b: character.attributes.mental_intelligence >= 2,
			dot55b: character.attributes.mental_intelligence >= 3,
			dot56b: character.attributes.mental_intelligence >= 4,
			dot57b: character.attributes.mental_intelligence >= 5,
			dot61b: true,
			dot62b: character.attributes.mental_wits >= 2,
			dot63b: character.attributes.mental_wits >= 3,
			dot64b: character.attributes.mental_wits >= 4,
			dot65b: character.attributes.mental_wits >= 5,
			dot69b: true,
			dot70b: character.attributes.mental_resolve >= 2,
			dot71b: character.attributes.mental_resolve >= 3,
			dot72b: character.attributes.mental_resolve >= 4,
			dot73b: character.attributes.mental_resolve >= 5,

			// Skills
			// Skills - Physical
			dot77b: (character.skills.find((s) => s.name === 'Athletics')?.value ?? 0) >= 1,
			dot78b: (character.skills.find((s) => s.name === 'Athletics')?.value ?? 0) >= 2,
			dot79b: (character.skills.find((s) => s.name === 'Athletics')?.value ?? 0) >= 3,
			dot80b: (character.skills.find((s) => s.name === 'Athletics')?.value ?? 0) >= 4,
			dot81b: (character.skills.find((s) => s.name === 'Athletics')?.value ?? 0) >= 5,
			dot85b: (character.skills.find((s) => s.name === 'Brawl')?.value ?? 0) >= 1,
			dot86b: (character.skills.find((s) => s.name === 'Brawl')?.value ?? 0) >= 2,
			dot87b: (character.skills.find((s) => s.name === 'Brawl')?.value ?? 0) >= 3,
			dot88b: (character.skills.find((s) => s.name === 'Brawl')?.value ?? 0) >= 4,
			dot89b: (character.skills.find((s) => s.name === 'Brawl')?.value ?? 0) >= 5,
			dot93b: (character.skills.find((s) => s.name === 'Crafts')?.value ?? 0) >= 1,
			dot94b: (character.skills.find((s) => s.name === 'Crafts')?.value ?? 0) >= 2,
			dot95b: (character.skills.find((s) => s.name === 'Crafts')?.value ?? 0) >= 3,
			dot96b: (character.skills.find((s) => s.name === 'Crafts')?.value ?? 0) >= 4,
			dot97b: (character.skills.find((s) => s.name === 'Crafts')?.value ?? 0) >= 5,
			abilities3b: character.skills.find((s) => s.name === 'Crafts')?.specialization ?? '',
			dot101b: (character.skills.find((s) => s.name === 'Driving')?.value ?? 0) >= 1,
			dot102b: (character.skills.find((s) => s.name === 'Driving')?.value ?? 0) >= 2,
			dot103b: (character.skills.find((s) => s.name === 'Driving')?.value ?? 0) >= 3,
			dot104b: (character.skills.find((s) => s.name === 'Driving')?.value ?? 0) >= 4,
			dot105b: (character.skills.find((s) => s.name === 'Driving')?.value ?? 0) >= 5,
			dot109b: (character.skills.find((s) => s.name === 'Marksmanship')?.value ?? 0) >= 1,
			dot110b: (character.skills.find((s) => s.name === 'Marksmanship')?.value ?? 0) >= 2,
			dot111b: (character.skills.find((s) => s.name === 'Marksmanship')?.value ?? 0) >= 3,
			dot112b: (character.skills.find((s) => s.name === 'Marksmanship')?.value ?? 0) >= 4,
			dot113b: (character.skills.find((s) => s.name === 'Marksmanship')?.value ?? 0) >= 5,
			dot117b: (character.skills.find((s) => s.name === 'Larceny')?.value ?? 0) >= 1,
			dot118b: (character.skills.find((s) => s.name === 'Larceny')?.value ?? 0) >= 2,
			dot119b: (character.skills.find((s) => s.name === 'Larceny')?.value ?? 0) >= 3,
			dot120b: (character.skills.find((s) => s.name === 'Larceny')?.value ?? 0) >= 4,
			dot121b: (character.skills.find((s) => s.name === 'Larceny')?.value ?? 0) >= 5,
			dot125b: (character.skills.find((s) => s.name === 'Melee')?.value ?? 0) >= 1,
			dot126b: (character.skills.find((s) => s.name === 'Melee')?.value ?? 0) >= 2,
			dot127b: (character.skills.find((s) => s.name === 'Melee')?.value ?? 0) >= 3,
			dot128b: (character.skills.find((s) => s.name === 'Melee')?.value ?? 0) >= 4,
			dot129b: (character.skills.find((s) => s.name === 'Melee')?.value ?? 0) >= 5,
			dot133b: (character.skills.find((s) => s.name === 'Stealth')?.value ?? 0) >= 1,
			dot134b: (character.skills.find((s) => s.name === 'Stealth')?.value ?? 0) >= 2,
			dot135b: (character.skills.find((s) => s.name === 'Stealth')?.value ?? 0) >= 3,
			dot136b: (character.skills.find((s) => s.name === 'Stealth')?.value ?? 0) >= 4,
			dot137b: (character.skills.find((s) => s.name === 'Stealth')?.value ?? 0) >= 5,
			dot141b: (character.skills.find((s) => s.name === 'Survival')?.value ?? 0) >= 1,
			dot142b: (character.skills.find((s) => s.name === 'Survival')?.value ?? 0) >= 2,
			dot143b: (character.skills.find((s) => s.name === 'Survival')?.value ?? 0) >= 3,
			dot144b: (character.skills.find((s) => s.name === 'Survival')?.value ?? 0) >= 4,
			dot145b: (character.skills.find((s) => s.name === 'Survival')?.value ?? 0) >= 5,

			// Skills - Social
			dot157b: (character.skills.find((s) => s.name === 'Animal Ken')?.value ?? 0) >= 1,
			dot158b: (character.skills.find((s) => s.name === 'Animal Ken')?.value ?? 0) >= 2,
			dot159b: (character.skills.find((s) => s.name === 'Animal Ken')?.value ?? 0) >= 3,
			dot160b: (character.skills.find((s) => s.name === 'Animal Ken')?.value ?? 0) >= 4,
			dot161b: (character.skills.find((s) => s.name === 'Animal Ken')?.value ?? 0) >= 5,
			dot165b: (character.skills.find((s) => s.name === 'Etiquette')?.value ?? 0) >= 1,
			dot166b: (character.skills.find((s) => s.name === 'Etiquette')?.value ?? 0) >= 2,
			dot167b: (character.skills.find((s) => s.name === 'Etiquette')?.value ?? 0) >= 3,
			dot168b: (character.skills.find((s) => s.name === 'Etiquette')?.value ?? 0) >= 4,
			dot169b: (character.skills.find((s) => s.name === 'Etiquette')?.value ?? 0) >= 5,
			dot173b: (character.skills.find((s) => s.name === 'Insight')?.value ?? 0) >= 1,
			dot174b: (character.skills.find((s) => s.name === 'Insight')?.value ?? 0) >= 2,
			dot175b: (character.skills.find((s) => s.name === 'Insight')?.value ?? 0) >= 3,
			dot176b: (character.skills.find((s) => s.name === 'Insight')?.value ?? 0) >= 4,
			dot177b: (character.skills.find((s) => s.name === 'Insight')?.value ?? 0) >= 5,
			dot181b: (character.skills.find((s) => s.name === 'Intimidation')?.value ?? 0) >= 1,
			dot182b: (character.skills.find((s) => s.name === 'Intimidation')?.value ?? 0) >= 2,
			dot183b: (character.skills.find((s) => s.name === 'Intimidation')?.value ?? 0) >= 3,
			dot184b: (character.skills.find((s) => s.name === 'Intimidation')?.value ?? 0) >= 4,
			dot185b: (character.skills.find((s) => s.name === 'Intimidation')?.value ?? 0) >= 5,
			dot189b: (character.skills.find((s) => s.name === 'Leadership')?.value ?? 0) >= 1,
			dot190b: (character.skills.find((s) => s.name === 'Leadership')?.value ?? 0) >= 2,
			dot191b: (character.skills.find((s) => s.name === 'Leadership')?.value ?? 0) >= 3,
			dot192b: (character.skills.find((s) => s.name === 'Leadership')?.value ?? 0) >= 4,
			dot193b: (character.skills.find((s) => s.name === 'Leadership')?.value ?? 0) >= 5,
			dot197b: (character.skills.find((s) => s.name === 'Performance')?.value ?? 0) >= 1,
			dot198b: (character.skills.find((s) => s.name === 'Performance')?.value ?? 0) >= 2,
			dot199b: (character.skills.find((s) => s.name === 'Performance')?.value ?? 0) >= 3,
			dot200b: (character.skills.find((s) => s.name === 'Performance')?.value ?? 0) >= 4,
			dot201b: (character.skills.find((s) => s.name === 'Performance')?.value ?? 0) >= 5,
			abilities16b: character.skills.find((s) => s.name === 'Performance')?.specialization ?? '',
			dot205b: (character.skills.find((s) => s.name === 'Persuasion')?.value ?? 0) >= 1,
			dot206b: (character.skills.find((s) => s.name === 'Persuasion')?.value ?? 0) >= 2,
			dot207b: (character.skills.find((s) => s.name === 'Persuasion')?.value ?? 0) >= 3,
			dot208b: (character.skills.find((s) => s.name === 'Persuasion')?.value ?? 0) >= 4,
			dot209b: (character.skills.find((s) => s.name === 'Persuasion')?.value ?? 0) >= 5,
			dot213b: (character.skills.find((s) => s.name === 'Streetwise')?.value ?? 0) >= 1,
			dot214b: (character.skills.find((s) => s.name === 'Streetwise')?.value ?? 0) >= 2,
			dot215b: (character.skills.find((s) => s.name === 'Streetwise')?.value ?? 0) >= 3,
			dot216b: (character.skills.find((s) => s.name === 'Streetwise')?.value ?? 0) >= 4,
			dot217b: (character.skills.find((s) => s.name === 'Streetwise')?.value ?? 0) >= 5,
			dot221b: (character.skills.find((s) => s.name === 'Subterfuge')?.value ?? 0) >= 1,
			dot222b: (character.skills.find((s) => s.name === 'Subterfuge')?.value ?? 0) >= 2,
			dot223b: (character.skills.find((s) => s.name === 'Subterfuge')?.value ?? 0) >= 3,
			dot224b: (character.skills.find((s) => s.name === 'Subterfuge')?.value ?? 0) >= 4,
			dot225b: (character.skills.find((s) => s.name === 'Subterfuge')?.value ?? 0) >= 5,

			// Skills - Mental
			dot237b: (character.skills.find((s) => s.name === 'Academics')?.value ?? 0) >= 1,
			dot238b: (character.skills.find((s) => s.name === 'Academics')?.value ?? 0) >= 2,
			dot239b: (character.skills.find((s) => s.name === 'Academics')?.value ?? 0) >= 3,
			dot240b: (character.skills.find((s) => s.name === 'Academics')?.value ?? 0) >= 4,
			dot241b: (character.skills.find((s) => s.name === 'Academics')?.value ?? 0) >= 5,
			abilities21b: character.skills.find((s) => s.name === 'Academics')?.specialization ?? '',
			dot245b: (character.skills.find((s) => s.name === 'Awareness')?.value ?? 0) >= 1,
			dot246b: (character.skills.find((s) => s.name === 'Awareness')?.value ?? 0) >= 2,
			dot247b: (character.skills.find((s) => s.name === 'Awareness')?.value ?? 0) >= 3,
			dot248b: (character.skills.find((s) => s.name === 'Awareness')?.value ?? 0) >= 4,
			dot249b: (character.skills.find((s) => s.name === 'Awareness')?.value ?? 0) >= 5,
			dot253b: (character.skills.find((s) => s.name === 'Finance')?.value ?? 0) >= 1,
			dot254b: (character.skills.find((s) => s.name === 'Finance')?.value ?? 0) >= 2,
			dot255b: (character.skills.find((s) => s.name === 'Finance')?.value ?? 0) >= 3,
			dot256b: (character.skills.find((s) => s.name === 'Finance')?.value ?? 0) >= 4,
			dot257b: (character.skills.find((s) => s.name === 'Finance')?.value ?? 0) >= 5,
			dot261b: (character.skills.find((s) => s.name === 'Investigation')?.value ?? 0) >= 1,
			dot262b: (character.skills.find((s) => s.name === 'Investigation')?.value ?? 0) >= 2,
			dot263b: (character.skills.find((s) => s.name === 'Investigation')?.value ?? 0) >= 3,
			dot264b: (character.skills.find((s) => s.name === 'Investigation')?.value ?? 0) >= 4,
			dot265b: (character.skills.find((s) => s.name === 'Investigation')?.value ?? 0) >= 5,
			dot269b: (character.skills.find((s) => s.name === 'Medicine')?.value ?? 0) >= 1,
			dot270b: (character.skills.find((s) => s.name === 'Medicine')?.value ?? 0) >= 2,
			dot271b: (character.skills.find((s) => s.name === 'Medicine')?.value ?? 0) >= 3,
			dot272b: (character.skills.find((s) => s.name === 'Medicine')?.value ?? 0) >= 4,
			dot273b: (character.skills.find((s) => s.name === 'Medicine')?.value ?? 0) >= 5,
			dot277b: (character.skills.find((s) => s.name === 'Occult')?.value ?? 0) >= 1,
			dot278b: (character.skills.find((s) => s.name === 'Occult')?.value ?? 0) >= 2,
			dot279b: (character.skills.find((s) => s.name === 'Occult')?.value ?? 0) >= 3,
			dot280b: (character.skills.find((s) => s.name === 'Occult')?.value ?? 0) >= 4,
			dot281b: (character.skills.find((s) => s.name === 'Occult')?.value ?? 0) >= 5,
			dot285b: (character.skills.find((s) => s.name === 'Politics')?.value ?? 0) >= 1,
			dot286b: (character.skills.find((s) => s.name === 'Politics')?.value ?? 0) >= 2,
			dot287b: (character.skills.find((s) => s.name === 'Politics')?.value ?? 0) >= 3,
			dot288b: (character.skills.find((s) => s.name === 'Politics')?.value ?? 0) >= 4,
			dot289b: (character.skills.find((s) => s.name === 'Politics')?.value ?? 0) >= 5,
			dot293b: (character.skills.find((s) => s.name === 'Science')?.value ?? 0) >= 1,
			dot294b: (character.skills.find((s) => s.name === 'Science')?.value ?? 0) >= 2,
			dot295b: (character.skills.find((s) => s.name === 'Science')?.value ?? 0) >= 3,
			dot296b: (character.skills.find((s) => s.name === 'Science')?.value ?? 0) >= 4,
			dot297b: (character.skills.find((s) => s.name === 'Science')?.value ?? 0) >= 5,
			abilities28b: character.skills.find((s) => s.name === 'Science')?.specialization ?? '',
			dot301b: (character.skills.find((s) => s.name === 'Technology')?.value ?? 0) >= 1,
			dot302b: (character.skills.find((s) => s.name === 'Technology')?.value ?? 0) >= 2,
			dot303b: (character.skills.find((s) => s.name === 'Technology')?.value ?? 0) >= 3,
			dot304b: (character.skills.find((s) => s.name === 'Technology')?.value ?? 0) >= 4,
			dot305b: (character.skills.find((s) => s.name === 'Technology')?.value ?? 0) >= 5,

			// Chronicle Tenets
			CT1: projectsDefinition[character.project]?.tenets[0]?.title ?? '',
			CT2: projectsDefinition[character.project]?.tenets[0]?.description ?? '',
			CT3: projectsDefinition[character.project]?.tenets[1]?.title ?? '',
			CT4: projectsDefinition[character.project]?.tenets[1]?.description ?? '',
			CT5: projectsDefinition[character.project]?.tenets[2]?.title ?? '',
			CT6: projectsDefinition[character.project]?.tenets[2]?.description ?? '',

			// Convictions & Touchstones
			TC1: character.morality[0]?.conviction ?? '',
			TC2: character.morality[0]?.touchstone ?? '',
			TC3: character.morality[1]?.conviction ?? '',
			TC4: character.morality[1]?.touchstone ?? '',
			TC5: character.morality[2]?.conviction ?? '',
			TC6: character.morality[2]?.touchstone ?? '',

			// Clan Bane
			CB1: clanConfig[character.clan].bane.title + ': ' + clanBane[0],
			CB2: clanBane[1],
			CB3: clanBane[2],
			CB4: clanBane[3],
			CB5: clanBane[4],
			CB6: bloodPotencyConfig[character.bloodPotency].baneSeverity,

			// Disciplines
			disciplineslist1: character.disciplines[0]?.name ?? '',
			dot149b: (character.disciplines[0]?.value ?? 0) >= 1,
			dot150b: (character.disciplines[0]?.value ?? 0) >= 2,
			dot151b: (character.disciplines[0]?.value ?? 0) >= 3,
			dot152b: (character.disciplines[0]?.value ?? 0) >= 4,
			dot152ab: (character.disciplines[0]?.value ?? 0) >= 5,
			disciplines2: character.disciplines[0]?.powers[0]?.name ?? '',
			disciplines3: character.disciplines[0]?.powers[1]?.name ?? '',
			disciplines4: character.disciplines[0]?.powers[2]?.name ?? '',
			disciplines5: character.disciplines[0]?.powers[3]?.name ?? '',
			disciplines6: character.disciplines[0]?.powers[4]?.name ?? '',
			disciplineslist2: character.disciplines[1]?.name ?? '',
			dot149qb: (character.disciplines[1]?.value ?? 0) >= 1,
			dot150qb: (character.disciplines[1]?.value ?? 0) >= 2,
			dot151qb: (character.disciplines[1]?.value ?? 0) >= 3,
			dot152qb: (character.disciplines[1]?.value ?? 0) >= 4,
			dot152aqb: (character.disciplines[1]?.value ?? 0) >= 5,
			disciplines8: character.disciplines[1]?.powers[0]?.name ?? '',
			disciplines9: character.disciplines[1]?.powers[1]?.name ?? '',
			disciplines10: character.disciplines[1]?.powers[2]?.name ?? '',
			disciplines11: character.disciplines[1]?.powers[3]?.name ?? '',
			disciplines12: character.disciplines[1]?.powers[4]?.name ?? '',
			disciplineslist3: character.disciplines[2]?.name ?? '',
			dot309b: (character.disciplines[2]?.value ?? 0) >= 1,
			dot310b: (character.disciplines[2]?.value ?? 0) >= 2,
			dot311b: (character.disciplines[2]?.value ?? 0) >= 3,
			dot312b: (character.disciplines[2]?.value ?? 0) >= 4,
			dot312ab: (character.disciplines[2]?.value ?? 0) >= 5,
			disciplines14: character.disciplines[2]?.powers[0]?.name ?? '',
			disciplines15: character.disciplines[2]?.powers[1]?.name ?? '',
			disciplines16: character.disciplines[2]?.powers[2]?.name ?? '',
			disciplines17: character.disciplines[2]?.powers[3]?.name ?? '',
			disciplines18: character.disciplines[2]?.powers[4]?.name ?? '',
			disciplineslist4: character.disciplines[3]?.name ?? '',
			dot229b: (character.disciplines[3]?.value ?? 0) >= 1,
			dot230b: (character.disciplines[3]?.value ?? 0) >= 2,
			dot231b: (character.disciplines[3]?.value ?? 0) >= 3,
			dot232b: (character.disciplines[3]?.value ?? 0) >= 4,
			dot232ab: (character.disciplines[3]?.value ?? 0) >= 5,
			disciplines20: character.disciplines[3]?.powers[0]?.name ?? '',
			disciplines21: character.disciplines[3]?.powers[1]?.name ?? '',
			disciplines22: character.disciplines[3]?.powers[2]?.name ?? '',
			disciplines23: character.disciplines[3]?.powers[3]?.name ?? '',
			disciplines24: character.disciplines[3]?.powers[4]?.name ?? '',
			disciplineslist5: character.disciplines[4]?.name ?? '',
			dot229qb: (character.disciplines[4]?.value ?? 0) >= 1,
			dot230qb: (character.disciplines[4]?.value ?? 0) >= 2,
			dot231qb: (character.disciplines[4]?.value ?? 0) >= 3,
			dot232qb: (character.disciplines[4]?.value ?? 0) >= 4,
			dot232qab: (character.disciplines[4]?.value ?? 0) >= 5,
			disciplines26: character.disciplines[4]?.powers[0]?.name ?? '',
			disciplines27: character.disciplines[4]?.powers[1]?.name ?? '',
			disciplines28: character.disciplines[4]?.powers[2]?.name ?? '',
			disciplines29: character.disciplines[4]?.powers[3]?.name ?? '',
			disciplines30: character.disciplines[4]?.powers[4]?.name ?? '',
			disciplineslist6: character.disciplines[5]?.name ?? '',
			dot309qb: (character.disciplines[5]?.value ?? 0) >= 1,
			dot310qb: (character.disciplines[5]?.value ?? 0) >= 2,
			dot311qb: (character.disciplines[5]?.value ?? 0) >= 3,
			dot312qb: (character.disciplines[5]?.value ?? 0) >= 4,
			dot312qab: (character.disciplines[5]?.value ?? 0) >= 5,
			disciplines32: character.disciplines[5]?.powers[0]?.name ?? '',
			disciplines33: character.disciplines[5]?.powers[1]?.name ?? '',
			disciplines34: character.disciplines[5]?.powers[2]?.name ?? '',
			disciplines35: character.disciplines[5]?.powers[3]?.name ?? '',
			disciplines36: character.disciplines[5]?.powers[4]?.name ?? '',

			// Health
			check1: character.attributes.physical_stamina + 3 < 1,
			check2: character.attributes.physical_stamina + 3 < 2,
			check3: character.attributes.physical_stamina + 3 < 3,
			check4: character.attributes.physical_stamina + 3 < 4,
			check5: character.attributes.physical_stamina + 3 < 5,
			check6: character.attributes.physical_stamina + 3 < 6,
			check7: character.attributes.physical_stamina + 3 < 7,
			check8: character.attributes.physical_stamina + 3 < 8,
			check9: character.attributes.physical_stamina + 3 < 9,
			check10: character.attributes.physical_stamina + 3 < 10,
			check11: character.attributes.physical_stamina + 3 < 11,
			check12: character.attributes.physical_stamina + 3 < 12,
			check13: character.attributes.physical_stamina + 3 < 13,
			check14: character.attributes.physical_stamina + 3 < 14,
			check15: character.attributes.physical_stamina + 3 < 15,

			// Willpower
			check16: character.attributes.mental_resolve + character.attributes.social_composure < 1,
			check17: character.attributes.mental_resolve + character.attributes.social_composure < 2,
			check18: character.attributes.mental_resolve + character.attributes.social_composure < 3,
			check19: character.attributes.mental_resolve + character.attributes.social_composure < 4,
			check20: character.attributes.mental_resolve + character.attributes.social_composure < 5,
			check21: character.attributes.mental_resolve + character.attributes.social_composure < 6,
			check22: character.attributes.mental_resolve + character.attributes.social_composure < 7,
			check23: character.attributes.mental_resolve + character.attributes.social_composure < 8,
			check24: character.attributes.mental_resolve + character.attributes.social_composure < 9,
			check25: character.attributes.mental_resolve + character.attributes.social_composure < 10,
			check26: character.attributes.mental_resolve + character.attributes.social_composure < 11,
			check27: character.attributes.mental_resolve + character.attributes.social_composure < 12,
			check28: character.attributes.mental_resolve + character.attributes.social_composure < 13,
			check29: character.attributes.mental_resolve + character.attributes.social_composure < 14,
			check30: character.attributes.mental_resolve + character.attributes.social_composure < 15,

			// Humanity
			check31: character.humanity.value >= 1,
			check32: character.humanity.value >= 2,
			check33: character.humanity.value >= 3,
			check34: character.humanity.value >= 4,
			check35: character.humanity.value >= 5,
			check36: character.humanity.value >= 6,
			check37: character.humanity.value >= 7,
			check38: character.humanity.value >= 8,
			check39: character.humanity.value >= 9,
			check40: character.humanity.value >= 10,

			// Blood Potency
			hdot1: character.bloodPotency >= 1,
			hdot2: character.bloodPotency >= 2,
			hdot3: character.bloodPotency >= 3,
			hdot4: character.bloodPotency >= 4,
			hdot5: character.bloodPotency >= 5,
			hdot6: character.bloodPotency >= 6,
			hdot7: character.bloodPotency >= 7,
			hdot8: character.bloodPotency >= 8,
			hdot9: character.bloodPotency >= 9,
			hdot10: character.bloodPotency >= 10,
			BPstat1: bloodPotencyConfig[character.bloodPotency].bloodSurgeBonus,
			BPstat2: bloodPotencyConfig[character.bloodPotency].mendingDamage,
			BPstat3: bloodPotencyConfig[character.bloodPotency].disciplineDefenseBonus,
			BPstat4: bloodPotencyConfig[character.bloodPotency].disciplineRousingBonus,
			BPstat5: bloodPotencyConfig[character.bloodPotency].feedingPenalty,
			hunting1: `${attribute} + ${skill}`,
			BPstat6:
				character.attributes.social_composure +
				(character.skills.find((s) => s.name === 'Awareness')?.value ?? 0),

			// Backgrounds
			...parseBackgrounds(character.backgrounds),

			// Merits
			...parseMerits(character.merits),

			// Flaws
			...parseFlaws(character.flaws),

			// Ceremonies & Rituals
			...parseRitualsAndCeremonies(character.rituals, character.ceremonies),

			// Experience
			...parseExperience(character.experience, character.project)
		};

		const pdfBytes = await fillPdfForm(pdfName, formData, color);

		// Create download
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${character.name}-sheet.pdf`;
		link.click();

		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Failed to generate PDF:', error);
	}
}

function getDotBase(index: number): { first: string; second: string; third: string } {
	const dotPatterns = [
		{ first: '543', second: '544', third: '544a' },
		{ first: '551', second: '552', third: '552a' },
		{ first: '559', second: '560', third: '560a' },
		{ first: '559q', second: '560q', third: '560qa' },
		{ first: '568', second: '569', third: '569a' },
		{ first: '576', second: '577', third: '577a' },
		{ first: '584', second: '585', third: '585a' },
		{ first: '584q', second: '585q', third: '585qa' },
		{ first: '592', second: '593', third: '593a' },
		{ first: '600', second: '601', third: '601a' },
		{ first: '608', second: '609', third: '609a' },
		{ first: '8', second: '8a', third: '8az' }
	];
	return dotPatterns[index - 1] ?? dotPatterns[0];
}

function parseBackgrounds(backgrounds: PlayerBackground[]) {
	const backgroundFields: Record<string, string | boolean> = {};
	let currentBgIndex = 0;
	let currentAdvIndex = 1;

	for (const bg of backgrounds) {
		const totalFeatures = (bg.advantages?.length ?? 0) + (bg.disadvantages?.length ?? 0);

		// Add background name and dots
		backgroundFields[`backgrounds${currentBgIndex + 1}`] = bg.name;
		backgroundFields[`dot${319 + currentBgIndex * 8}b`] = bg.value >= 1;
		backgroundFields[`dot${320 + currentBgIndex * 8}b`] = bg.value >= 2;
		backgroundFields[`dot${320 + currentBgIndex * 8}ab`] = bg.value >= 3;

		if (totalFeatures === 0) {
			// Add empty line in advantages/disadvantages list
			backgroundFields[`adv/disadv${currentAdvIndex}`] = '';
			currentAdvIndex++;
			currentBgIndex++;
			continue;
		}

		// Add advantages first with their dots
		if (bg.advantages?.length) {
			bg.advantages.forEach((adv) => {
				const dots = getDotBase(currentAdvIndex);
				backgroundFields[`adv/disadv${currentAdvIndex}`] = adv.name;
				backgroundFields[`dot${dots.first}b`] = true;
				backgroundFields[`dot${dots.second}b`] = adv.value >= 2;
				backgroundFields[`dot${dots.third}b`] = adv.value >= 3;
				currentAdvIndex++;
			});
		}

		// Add disadvantages with their dots
		if (bg.disadvantages?.length) {
			bg.disadvantages.forEach((dis) => {
				const dots = getDotBase(currentAdvIndex);
				backgroundFields[`adv/disadv${currentAdvIndex}`] = dis.name;
				backgroundFields[`dot${dots.first}b`] = true;
				backgroundFields[`dot${dots.second}b`] = dis.value >= 2;
				backgroundFields[`dot${dots.third}b`] = dis.value >= 3;
				currentAdvIndex++;
			});
		}

		// Skip background lines based on total features
		currentBgIndex += Math.max(totalFeatures, 1);

		// Break if we exceed available fields
		if (currentBgIndex >= 12) break;
	}

	return backgroundFields;
}

function parseMerits(merits: PlayerMerit[] | undefined) {
	if (!merits) return {};

	const meritFields: Record<string, string | boolean> = {};
	let currentMeritIndex = 1;

	for (const merit of merits) {
		meritFields[`merits${currentMeritIndex}`] = merit.name;
		meritFields[`dot${6 + currentMeritIndex * 8}`] = merit.value >= 1;
		meritFields[`dot${6 + currentMeritIndex * 8 + 1}`] = merit.value >= 2;
		meritFields[`dot${6 + currentMeritIndex * 8 + 2}`] = merit.value >= 3;
		meritFields[`dot${6 + currentMeritIndex * 8 + 2}a`] = merit.value >= 4;
		meritFields[`dot${6 + currentMeritIndex * 8 + 2}az`] = merit.value >= 5;

		currentMeritIndex++;
		if (currentMeritIndex > 12) break;
	}

	return meritFields;
}

function parseFlaws(flaws: PlayerFlaw[] | undefined) {
	if (!flaws) return {};

	const flawFields: Record<string, string | boolean> = {};
	let currentFlawIndex = 1;

	for (const flaw of flaws) {
		flawFields[`flaws${currentFlawIndex}`] = flaw.name;
		flawFields[`dot${102 + currentFlawIndex * 8}`] = flaw.value >= 1;
		flawFields[`dot${102 + currentFlawIndex * 8 + 1}`] = flaw.value >= 2;
		flawFields[`dot${102 + currentFlawIndex * 8 + 2}`] = flaw.value >= 3;
		flawFields[`dot${102 + currentFlawIndex * 8 + 2}a`] = flaw.value >= 4;
		flawFields[`dot${102 + currentFlawIndex * 8 + 2}az`] = flaw.value >= 5;

		currentFlawIndex++;
		if (currentFlawIndex > 12) break;
	}

	return flawFields;
}

function parseRitualsAndCeremonies(
	rituals: BloodSorceryRitualName[] | undefined,
	ceremonies: OblivionCeremonyName[] | undefined
) {
	const ritualAndCeremonyFields: Record<string, string | boolean> = {};
	let currentIndex = 1;

	if (rituals) {
		for (const ritual of rituals) {
			ritualAndCeremonyFields[`rituals${currentIndex}`] =
				`${ritual} (Level ${getBloodSorceryRitualLevel(ritual)})`;

			currentIndex++;
			if (currentIndex > 18) break;
		}
	}

	if (ceremonies && currentIndex <= 18) {
		for (const ceremony of ceremonies) {
			ritualAndCeremonyFields[`rituals${currentIndex}`] =
				`${ceremony} (Level ${getOblivionCeremonyLevel(ceremony)})`;

			currentIndex++;
			if (currentIndex > 12) break;
		}
	}

	return ritualAndCeremonyFields;
}

function parseExperience(experience: PlayerExperience[], project: ProjectName) {
	const { gained, spent } = parseExperienceList(experience, project);

	return {
		exp1: getProjectStartExp(project) + gained,
		exp2: spent
	};
}
