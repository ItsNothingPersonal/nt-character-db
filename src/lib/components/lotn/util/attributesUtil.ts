import { type AttributeKeyMap, type AttributeName } from '$lib/zod/lotn/enums/attributeName';
import { type AttributeConfigMap } from '../config/attributeConfig';

export function getAttributeHelpText(
	config: AttributeConfigMap,
	category: keyof AttributeConfigMap,
	attribute: AttributeName
) {
	const key = attribute.toLowerCase() as AttributeKeyMap[AttributeName];

	if (category === 'physical') {
		return config.physical[key as keyof typeof config.physical].helptext;
	} else if (category === 'social') {
		return config.social[key as keyof typeof config.social].helptext;
	} else if (category === 'mental') {
		return config.mental[key as keyof typeof config.mental].helptext;
	}
}
export function mapAttributeNameToAttributeCategory(attribute: AttributeName) {
	switch (attribute) {
		case 'Strength':
		case 'Dexterity':
		case 'Stamina':
			return 'physical';
		case 'Charisma':
		case 'Manipulation':
		case 'Composure':
			return 'social';
		case 'Intelligence':
		case 'Wits':
		case 'Resolve':
			return 'mental';
	}
}

export function mapAttributeNameToProperty(attribute: AttributeName) {
	switch (attribute) {
		case 'Strength':
			return 'physical_strength';
		case 'Dexterity':
			return 'physical_dexterity';
		case 'Stamina':
			return 'physical_stamina';
		case 'Charisma':
			return 'social_charisma';
		case 'Manipulation':
			return 'social_manipulation';
		case 'Composure':
			return 'social_composure';
		case 'Intelligence':
			return 'mental_intelligence';
		case 'Wits':
			return 'mental_wits';
		case 'Resolve':
			return 'mental_resolve';
	}
}

export function mapPropertyToAttributeName(property: string): AttributeName | undefined {
	switch (property) {
		case 'physical_strength':
			return 'Strength';
		case 'physical_dexterity':
			return 'Dexterity';
		case 'physical_stamina':
			return 'Stamina';
		case 'social_charisma':
			return 'Charisma';
		case 'social_manipulation':
			return 'Manipulation';
		case 'social_composure':
			return 'Composure';
		case 'mental_intelligence':
			return 'Intelligence';
		case 'mental_wits':
			return 'Wits';
		case 'mental_resolve':
			return 'Resolve';
	}
}
