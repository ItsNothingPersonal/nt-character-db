import { backgroundPaymentStore, characterCreationStore } from '$lib/stores/characterCreationStore';
import { meritPaymentStore } from '$lib/stores/meritPaymentStore';
import { backgroundName } from '$lib/zod/lotn/enums/backgroundName';
import { flawName } from '$lib/zod/lotn/enums/flawName';
import { meritName, type MeritName } from '$lib/zod/lotn/enums/meritName';
import type { PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
import { get } from 'svelte/store';
import { flawConfig } from '../config/flawsConfig';
import { meritConfig } from '../config/meritsConfig';
import { createNumberList } from './generalUtils';

export function getApplicableMeritLevels(meritName: MeritName) {
	const config = meritConfig[meritName];
	if (!config) return [];

	if ('levelVariable' in config && config.levelVariable) {
		if (!config.max && !config.min) return [0];
		return createNumberList(config.max, config.min);
	} else {
		const numberList: number[] = [];
		if ('level1' in config) numberList.push(1);
		if ('level2' in config) numberList.push(2);
		if ('level3' in config) numberList.push(3);
		if ('level4' in config) numberList.push(4);
		if ('level5' in config) numberList.push(5);
		return numberList;
	}
}

export function hasMultipleMeritLevels(meritName: MeritName) {
	return getApplicableMeritLevels(meritName).length > 1;
}

export function getMeritValueDescription(meritName: MeritName, value: number) {
	const config = meritConfig[meritName];
	if (!config) return undefined;

	if ('levelVariable' in config && config.levelVariable) {
		return config.levelVariable;
	} else {
		if (!ifMeritLevelIsConfigured(meritName, value)) return undefined;

		switch (value) {
			case 1:
				if ('level1' in config) {
					return config.level1;
				}
				break;
			case 2:
				if ('level2' in config) {
					return config.level2;
				}
				break;
			case 3:
				if ('level3' in config) {
					return config.level3;
				}
				break;
			case 4:
				if ('level4' in config) {
					return config.level4;
				}
				break;
			case 5:
				if ('level5' in config) {
					return config.level5;
				}
				break;
			default:
				return '';
		}
	}
}

export function ifMeritLevelIsConfigured(meritName: MeritName, value: number) {
	const config = meritConfig[meritName];
	if (!config) return undefined;

	const levels = getApplicableMeritLevels(meritName);
	return levels?.includes(value) ?? false;
}

export function hasThinBloodAlchemyMerit() {
	return get(characterCreationStore).merits?.some((e) => e.name === 'Thin-Blood Alchemist');
}

export function getValidMerits() {
	const isThinBlood = get(characterCreationStore).clan === 'Thin-Blooded';

	return meritName.options
		.filter((merit) => {
			const config = meritConfig[merit];
			if (!config) return false;

			if (!get(characterCreationStore).ghoul && config.category === 'Ghoul') {
				return false;
			}
			if (!isThinBlood && config.category === 'Thin-Blood') {
				return false;
			}
			if (
				get(characterCreationStore).ghoul &&
				config.category === 'Feeding' &&
				config.ghoulAllowed !== true
			) {
				return false;
			}

			const multiPurchase = config.multiPurchase ?? false;
			if (
				get(characterCreationStore).merits?.some(
					(existingMerit) =>
						existingMerit.name === merit &&
						(!multiPurchase ||
							(config.max &&
								(get(characterCreationStore).merits?.filter((e) => e.name === merit) ?? [])
									.length >= config.max))
				)
			) {
				return false;
			}

			if (config.prerequisite) {
				const prereq = config.prerequisite;
				if (Array.isArray(prereq)) {
					const invalidPrerequisiteFound = prereq.some((prereqEntry) => {
						if (typeof prereqEntry === 'string') {
							return get(characterCreationStore).clan === prereqEntry;
						} else {
							const isBackground = backgroundName.safeParse(prereqEntry.name);
							if (
								prereqEntry.name === 'Blood Potency' &&
								get(characterCreationStore).bloodPotency > prereqEntry.value
							) {
								return true;
							} else if (isBackground.success) {
								const background = get(characterCreationStore).backgrounds.find(
									(e) => e.name === prereqEntry.name && e.value >= prereqEntry.value
								);
								if (!background) return true;
							}
						}
						return false;
					});

					// falls ein Hinderungsgrund gefunden wurde muss hier der invertierte Wert (also false) zurückgegeben werden, da wir hier weiter "außen".filter verwenden
					return !invalidPrerequisiteFound;
				} else {
					if (typeof prereq === 'string') {
						return get(characterCreationStore).clan === prereq;
					} else {
						if (
							prereq.name === 'Blood Potency' &&
							get(characterCreationStore).bloodPotency > prereq.value
						) {
							return false;
						} else {
							const background = get(characterCreationStore).backgrounds.find(
								(e) => e.name === prereq.name && e.value >= prereq.value
							);
							if (!background) return false;
							return true;
						}
					}
				}
			}

			return true;
		})
		.toSorted();
}

export function getValidFlaws() {
	const isThinBlood = get(characterCreationStore).clan === 'Thin-Blooded';
	return flawName.options
		.filter((flaw) => {
			const config = flawConfig[flaw];
			if (!config) return false;

			if (!get(characterCreationStore).ghoul && config.category === 'Ghoul') {
				return false;
			}
			if (!isThinBlood && config.category === 'Thin-Blood') {
				return false;
			}
			if (
				get(characterCreationStore).ghoul &&
				config.category === 'Feeding' &&
				config.ghoulAllowed !== true
			) {
				return false;
			}

			const multiPurchase = config.multiPurchase ?? false;
			if (
				get(characterCreationStore).flaws?.some(
					(existingFlaw) => existingFlaw.name === flaw && !multiPurchase
				)
			) {
				return false;
			}

			if (config.prerequisite) {
				const prereq = config.prerequisite;
				if (
					prereq &&
					prereq.name === 'Blood Potency' &&
					get(characterCreationStore).bloodPotency > prereq.value
				) {
					return false;
				} else if (prereq) {
					const background = get(characterCreationStore).backgrounds.find(
						(e) => e.name === prereq.name && e.value >= prereq.value
					);
					if (background) return false;
					return true;
				}
			}

			return true;
		})
		.toSorted();
}

export function getValidMythicalFlaws() {
	return flawName.options
		.filter((flaw) => {
			if (flawConfig[flaw]?.category === 'Mythical') {
				return true;
			}
			return false;
		})
		.filter((flaw) => {
			const multiPurchase = flawConfig[flaw]?.multiPurchase ?? false;
			if (
				get(characterCreationStore).flaws?.some(
					(existingFlaw) => existingFlaw.name === flaw && !multiPurchase
				)
			) {
				return false;
			}
			return true;
		});
}

export function displaySpecificMeritDescription(merit: PlayerMerit) {
	return meritConfig[merit.name]?.hasSpecificDescription;
}

export function meritHasLinkedSkills(merit: PlayerMerit) {
	return meritConfig[merit.name]?.linkedSkills?.filter(
		(e) =>
			!get(characterCreationStore).merits?.some((m) => m.linkedSkill?.includes(e)) ||
			e === merit.linkedSkill
	);
}

export function hasBeenPaidWithDots(merit: PlayerMerit & { id: string }) {
	return get(meritPaymentStore._meritStoreInternal).some(
		(p) => p.id === merit.id && (p.freebies > 0 || p.loresheet > 0 || p.predator > 0 || p.xp > 0)
	);
}

export function hasBeenGrantedByLoresheet(merit: PlayerMerit & { id: string }) {
	return get(backgroundPaymentStore.paymentStore).loresheet.some((p) => p.id === merit.id);
}

export function isThinBloodMerit(merit: MeritName) {
	const config = meritConfig[merit];
	if (!config) return false;

	return config.category === 'Thin-Blood';
}

export function isPredatorMerit(merit: PlayerMerit & { id: string }) {
	return meritPaymentStore.getPredatorMerits().some((e) => e.id === merit.id);
}

export function isLoresheetMerit(merit: PlayerMerit & { id: string }) {
	return backgroundPaymentStore.isLoresheetMerit(merit.id);
}

export function hasBeenPaidWithExperience(merit: PlayerMerit & { id: string }) {
	const experienceLogEntry = get(characterCreationStore).experience.find(
		(e) => e.element_id === merit.id && e.type === 'substract'
	);
	return experienceLogEntry !== undefined;
}

export function getMeritValue(merit: PlayerMerit & { id: string }) {
	return get(characterCreationStore).merits?.find((e) => e.id === merit.id)?.value;
}

export function getMeritsTotal() {
	const paidMerits = meritPaymentStore.getChosenMerits();
	return paidMerits.reduce((acc, merit) => acc + merit.freebies, 0);
}
