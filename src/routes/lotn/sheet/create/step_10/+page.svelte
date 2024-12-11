<script lang="ts">
	import type { BackgroundAdvantageDeleteEvent } from '$lib/components/lotn/characterSheet/components/BackgroundAdvantage/BackgroundAdvantageDeleteEvent';
	import { bloodSorceryRitualConfig } from '$lib/components/lotn/config/bloodSorceryRitualsConfig';
	import { ceremoniesConfig } from '$lib/components/lotn/config/ceremoniesConfig';
	import EditableAttributes from '$lib/components/lotn/EditableAttributes/EditableAttributes.svelte';
	import type { BackgroundAdvantageChangeEvent } from '$lib/components/lotn/EditableBackground/BackgroundAdvantageChangeEvent';
	import type { BackgroundChangeEvent } from '$lib/components/lotn/EditableBackground/BackroundChangeEvent';
	import EditableBackground from '$lib/components/lotn/EditableBackground/EditableBackground.svelte';
	import EditableBloodSorceryRitual from '$lib/components/lotn/EditableBloodSorceryRitual/EditableBloodSorceryRitual.svelte';
	import EditableDiscipline from '$lib/components/lotn/EditableDiscipline/EditableDiscipline.svelte';
	import EditableLoresheet from '$lib/components/lotn/EditableLoresheet/EditableLoresheet.svelte';
	import EditableMerit from '$lib/components/lotn/EditableMerit/EditableMerit.svelte';
	import EditableOblivionCeremony from '$lib/components/lotn/EditableOblivionCeremony/EditableOblivionCeremony.svelte';
	import EditableSkill from '$lib/components/lotn/EditableSkill/EditableSkill.svelte';
	import EditableThinBloodAlchemy from '$lib/components/lotn/EditableThinBloodAlchemy/EditableThinBloodAlchemy.svelte';
	import Tracker from '$lib/components/lotn/trackers/tracker/tracker.svelte';
	import { mapAttributeNameToProperty } from '$lib/components/lotn/util/attributesUtil';
	import { addBackground, canOnlyBeBoughtOnce } from '$lib/components/lotn/util/backgroundUtil';
	import {
		addBloodSorceryRitualPowers,
		addOblivionCeremonyPowers,
		deleteBloodSorceryRitualPowers,
		deleteOblivionCeremonyPowers,
		getBloodSorceryLevel,
		getBloodSorceryRitualLevel,
		getDisciplineCostFactor,
		getDisciplineValue,
		getInClanDisciplines,
		getOblivionCeremonyLevel,
		getOblivionLevel,
		getValidDisciplines,
		hasBloodSorcery,
		hasOblivion
	} from '$lib/components/lotn/util/disciplines';
	import { createNumberList, isMobileScreen } from '$lib/components/lotn/util/generalUtils';
	import {
		checkForFixedBackgrounds,
		checkForMerits
	} from '$lib/components/lotn/util/loresheetUtil';
	import {
		getApplicableMeritLevels,
		getValidMerits,
		hasBeenGrantedByLoresheet,
		hasBeenPaidWithDots,
		hasThinBloodAlchemyMerit
	} from '$lib/components/lotn/util/meritUtil';
	import { ScreenSize } from '$lib/sceenSize';
	import { attributesPaidWithDotsStore } from '$lib/stores/attributesPaidWithDotsStore';
	import {
		backgroundPaymentStore,
		characterCreationStore
	} from '$lib/stores/characterCreationStore';
	import { disciplineFreebieStore } from '$lib/stores/disciplineFreebieStore';
	import { skillsPaidWithDotsStore } from '$lib/stores/skillsPaidWithDotsStore';
	import { generateId, isNotNullOrUndefined } from '$lib/util';
	import { attributeName, type AttributeName } from '$lib/zod/lotn/enums/attributeName';
	import { backgroundName, type BackgroundName } from '$lib/zod/lotn/enums/backgroundName';
	import {
		bloodSorceryRitualName,
		type BloodSorceryRitualName
	} from '$lib/zod/lotn/enums/bloodSorceryRitualName';
	import {
		characterElementTypeName,
		type CharacterElementTypeName
	} from '$lib/zod/lotn/enums/characterElementTypeName';
	import { disciplineName, type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import {
		thinBloodAlchemyPowers,
		type ThinBloodAlchemyPowers
	} from '$lib/zod/lotn/enums/disciplinePowers/thinBloodAlchemyPowers';
	import type { LoresheetName } from '$lib/zod/lotn/enums/loresheetName';
	import { meritName, type MeritName } from '$lib/zod/lotn/enums/meritName';
	import {
		oblivionCeremonyName,
		type OblivionCeremonyName
	} from '$lib/zod/lotn/enums/oblivionCeremonyName';
	import { skillName, type SkillName } from '$lib/zod/lotn/enums/skillName';
	import { spheresOfInfluenceName } from '$lib/zod/lotn/enums/spheresOfInfluenceName';
	import type { PlayerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline';
	import type { PlayerMerit } from '$lib/zod/lotn/playerCharacter/playerMerit';
	import type { PlayerSkill } from '$lib/zod/lotn/playerCharacter/playerSkill';
	import { type RitualDisciplinePowerUnion } from '$lib/zod/lotn/util';

	let selectedKindIncreaseOption: CharacterElementTypeName | undefined = undefined;
	let selectedWhatIncreaseOption:
		| AttributeName
		| BackgroundName
		| MeritName
		| SkillName
		| DisciplineName
		| LoresheetName
		| 'No Loresheet Selected'
		| OblivionCeremonyName
		| BloodSorceryRitualName
		| 'Humanity'
		| ThinBloodAlchemyPowers
		| undefined;
	let selectWhatIncreaseAmountOption: number | undefined;
	let selectedSkillSpecialization: string | undefined = undefined;

	$: xpGained =
		20 +
		$characterCreationStore.experience.reduce((acc, curr) => {
			if (curr.type === 'add') {
				acc += curr.value;
			}
			return acc;
		}, 0);

	$: xpSpent = $characterCreationStore.experience.reduce((acc, curr) => {
		if (curr.type === 'substract') {
			acc += curr.value;
		}
		return acc;
	}, 0);

	$: xpLeft = xpGained - xpSpent;

	let amountInWhatIncreaseOption = getListToIncrease()?.length ?? 0;
	let innerWidth = 0;

	function getIncreaseKind() {
		return characterElementTypeName.options
			.filter((e) => e !== 'Blood Potency')
			.filter((e) => ($characterCreationStore.ghoul ? true : e !== 'Level 1 Discipline Power'))
			.filter((e) => ($characterCreationStore.ghoul ? e !== 'Discipline' : true))
			.filter((e) => ($characterCreationStore.ghoul ? e !== 'Ritual' : true))
			.filter((e) => ($characterCreationStore.ghoul ? e !== 'Ceremony' : true))
			.filter((e) => (!hasBloodSorcery() ? e !== 'Ritual' : true))
			.filter((e) => (!hasOblivion() ? e !== 'Ceremony' : true))
			.filter((e) => ($characterCreationStore.clan === 'Thin-Blooded' ? e !== 'Discipline' : true))
			.filter((e) =>
				$characterCreationStore.clan === 'Thin-Blooded' &&
				$characterCreationStore.merits?.some((e) => e.name === 'Thin-Blood Alchemist')
					? true
					: e !== 'Thin-Blood Formula'
			);
	}

	function getListToIncrease():
		| (
				| AttributeName
				| SkillName
				| BackgroundName
				| MeritName
				| DisciplineName
				| LoresheetName
				| 'No Loresheet Selected'
				| OblivionCeremonyName
				| BloodSorceryRitualName
				| 'Humanity'
				| ThinBloodAlchemyPowers
		  )[]
		| undefined {
		switch (selectedKindIncreaseOption) {
			case 'Attribute':
				return attributeName.options;
			case 'Background':
				return backgroundName.options;
			case 'Skill': {
				return skillName.options.filter(
					(e) => !$characterCreationStore.skills.some((s) => s.name === e)
				);
			}
			case 'Discipline':
				return disciplineName.options
					.filter((e) => {
						if (
							$characterCreationStore.merits?.some((e) => e.name === 'Thin-Blood Alchemist') &&
							e === 'Thin-Blood Alchemy'
						) {
							return true;
						} else if (e === 'Thin-Blood Alchemy') {
							return false;
						}
						return true;
					})
					.filter((e) => !$characterCreationStore.disciplines.some((d) => d.name === e));
			case 'Loresheet':
				if ($characterCreationStore.loresheet) {
					return [$characterCreationStore.loresheet?.name];
				} else {
					return ['No Loresheet Selected'];
				}
			case 'Ceremony':
				return oblivionCeremonyName.options;
			case 'Ritual':
				return bloodSorceryRitualName.options;
			case 'Humanity':
				return ['Humanity'];
			case 'Level 1 Discipline Power':
				return $characterCreationStore.clan
					? getInClanDisciplines($characterCreationStore.clan).filter(
							(i) => !$characterCreationStore.disciplines.some((d) => d.name === i)
						)
					: [];
			case 'Thin-Blood Formula':
				return thinBloodAlchemyPowers.options;
			case 'Merit':
				return getValidMerits();
			default:
				return [];
		}
	}

	function getIncreaseOptions() {
		switch (selectedKindIncreaseOption) {
			case 'Attribute': {
				if (!selectedWhatIncreaseOption) return [];
				const attribute = mapAttributeNameToProperty(
					attributeName.parse(selectedWhatIncreaseOption)
				);
				const min = $characterCreationStore.attributes[attribute];
				return createNumberList(5, min + 1);
			}
			case 'Skill': {
				if (!selectedWhatIncreaseOption) return [];
				const skill = skillName.parse(selectedWhatIncreaseOption);
				const min = $characterCreationStore.skills.find((e) => e.name === skill)?.value ?? 1;
				return createNumberList(5, min + 1);
			}
			case 'Background': {
				if (!selectedWhatIncreaseOption) return [];
				const background = backgroundName.parse(selectedWhatIncreaseOption);
				return $characterCreationStore.backgrounds.filter((e) => e.name === background);
			}
			case 'Discipline':
				return disciplineName.options.filter((e) => {
					if (
						$characterCreationStore.merits?.some((e) => e.name === 'Thin-Blood Alchemist') &&
						e === 'Thin-Blood Alchemy'
					) {
						return true;
					} else if (e === 'Thin-Blood Alchemy') {
						return false;
					}
					return true;
				});
			case 'Loresheet':
				if ($characterCreationStore.loresheet) {
					return [$characterCreationStore.loresheet?.name];
				} else {
					return ['No Loresheet Selected'];
				}
			case 'Ceremony':
				return oblivionCeremonyName.options;
			case 'Ritual':
				return bloodSorceryRitualName.options;
			case 'Humanity':
				return createNumberList(
					10,
					$characterCreationStore.humanity.value - getPaidHumanityUpgrades()
				);
			case 'Thin-Blood Formula':
				return thinBloodAlchemyPowers.options;
			default:
				return [];
		}
	}

	function adjustWhatIncreaseSelectionBox() {
		const list = getListToIncrease();
		if (!list) return;

		selectedWhatIncreaseOption = list[0];
	}

	function addSkill() {
		if (!selectedWhatIncreaseOption) return;
		if (
			$characterCreationStore.skills.some(
				(e) => e.name === skillName.parse(selectedWhatIncreaseOption)
			)
		) {
			return;
		}

		characterCreationStore.update((store) => {
			const id = generateId();

			const skill: PlayerSkill = {
				id,
				name: skillName.parse(selectedWhatIncreaseOption),
				value: 1,
				specialization: selectedSkillSpecialization
			};
			store.skills = [...store.skills, skill];

			store.experience = [
				...store.experience,
				{
					element_id: id,
					reason: `Added Skill ${selectedWhatIncreaseOption}`,
					type: 'substract',
					value: 3,
					date: new Date()
				}
			];

			return store;
		});

		selectedWhatIncreaseOption = undefined;
	}

	function updateSkill(event: CustomEvent<{ label: string; value: number }>) {
		characterCreationStore.update((store) => {
			let oldValue = 0;
			store.skills = store.skills.map((skill) => {
				if (skill.name === event.detail.label) {
					oldValue = skill.value;
					if (oldValue === event.detail.value) return skill;

					return { ...skill, value: event.detail.value };
				}
				return skill;
			});

			if (oldValue > event.detail.value) {
				cleanUpExperienceLog(event.detail.label, event.detail.value, oldValue, 3, 'Skill');
			} else {
				if (oldValue === event.detail.value) return store;

				store.experience = [
					...store.experience,
					{
						reason: `Increased Skill ${event.detail.label} to ${event.detail.value}`,
						type: 'substract',
						value: calculateFactorCost(oldValue, event.detail.value, 3),
						date: new Date()
					}
				];
			}

			return store;
		});
	}

	function updateSkillSpecialization(
		event: CustomEvent<{ label: string; specialization: string | undefined | null }>
	) {
		characterCreationStore.update((store) => {
			store.skills = store.skills.map((skill) => {
				if (skill.name === event.detail.label) {
					return { ...skill, specialization: event.detail.specialization };
				}
				return skill;
			});

			return store;
		});
	}

	function deleteSkill(event: CustomEvent<{ label: string }>) {
		characterCreationStore.update((store) => {
			store.skills = store.skills.filter((skill) => skill.name !== event.detail.label);
			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Skill ${event.detail.label}`)
			);
			return store;
		});

		selectedWhatIncreaseOption = undefined;
		amountInWhatIncreaseOption = getListToIncrease()?.length ?? 0;
	}

	function updateAttribute(event: CustomEvent<{ label: AttributeName; value: number }>) {
		characterCreationStore.update((store) => {
			const oldValue = store.attributes[mapAttributeNameToProperty(event.detail.label)];
			if (oldValue === event.detail.value) return store;

			store.attributes[mapAttributeNameToProperty(event.detail.label)] = event.detail.value;

			if (oldValue > event.detail.value) {
				cleanUpExperienceLog(event.detail.label, event.detail.value, oldValue, 5, 'Attribute');
			} else {
				if (oldValue === event.detail.value) return store;

				store.experience = [
					...store.experience,
					{
						reason: `Increased Attribute ${event.detail.label} to ${event.detail.value}`,
						type: 'substract',
						value: calculateFactorCost(oldValue, event.detail.value, 5),
						date: new Date()
					}
				];
			}

			return store;
		});
	}

	function handleAddBackground() {
		const id = addBackground(
			backgroundName.parse(selectedWhatIncreaseOption),
			canOnlyBeBoughtOnce,
			false
		);

		if (!id) return;

		characterCreationStore.update((store) => {
			store.experience = [
				...store.experience,
				{
					element_id: id,
					reason: `Added Background ${selectedWhatIncreaseOption}`,
					type: 'substract',
					value: 3,
					date: new Date()
				}
			];

			return store;
		});
	}

	function updateBackground(event: CustomEvent<BackgroundChangeEvent>) {
		switch (event.detail.type) {
			case 'value': {
				characterCreationStore.update((store) => {
					const toEditIndex = store.backgrounds.findIndex((b) => b.id === event.detail.id);
					if (toEditIndex === -1) return store;
					if (!(typeof event.detail.value === 'number')) return store;

					let oldValue = store.backgrounds[toEditIndex].value;
					store.backgrounds[toEditIndex].value = event.detail.value;

					if (oldValue > event.detail.value) {
						cleanUpExperienceLogFlat(
							event.detail.id,
							event.detail.label,
							event.detail.value,
							oldValue,
							3,
							'Background'
						);
					} else {
						if (oldValue === event.detail.value) return store;

						store.experience = [
							...store.experience,
							{
								element_id: event.detail.id,
								reason: `Increased Background ${event.detail.label} to ${event.detail.value}`,
								type: 'substract',
								value: calculateFlatCost(oldValue, event.detail.value, 3),
								date: new Date()
							}
						];
					}

					return store;
				});
				break;
			}
			case 'description':
				if (typeof event.detail.value === 'string') {
					characterCreationStore.update((store) => {
						const toEditIndex = store.backgrounds.findIndex((b) => b.id === event.detail.id);
						if (toEditIndex === -1) return store;
						if (!(typeof event.detail.value === 'string')) return store;

						store.backgrounds[toEditIndex].description = event.detail.value;

						return store;
					});
				}
				break;
			case 'sphereOfInfluence':
				if (typeof event.detail.value === 'string') {
					characterCreationStore.update((store) => {
						const toEditIndex = store.backgrounds.findIndex((b) => b.id === event.detail.id);
						if (toEditIndex === -1) return store;
						if (!(typeof event.detail.value === 'string')) return store;

						const resultParsed = spheresOfInfluenceName.safeParse(event.detail.value);
						if (!resultParsed.success) return store;

						store.backgrounds[toEditIndex].sphereOfInfluence = resultParsed.data;

						return store;
					});
				}
				break;
		}
	}

	function deleteBackground(event: CustomEvent<BackgroundChangeEvent>) {
		characterCreationStore.update((store) => {
			const advantages = store.backgrounds.find((b) => b.id === event.detail.id)?.advantages;
			advantages?.forEach((advantage) => {
				store.experience = store.experience.filter((exp) => exp.element_id !== advantage.id);
			});

			store.backgrounds = store.backgrounds.filter((b) => b.id !== event.detail.id);
			store.experience = store.experience.filter((exp) => exp.element_id !== event.detail.id);
			return store;
		});
	}

	function updateBackgroundAdvantage(event: CustomEvent<BackgroundAdvantageChangeEvent>) {
		characterCreationStore.update((store) => {
			if (!event.detail.name) return store;
			if (!event.detail.value) return store;

			const backgroundIndex = store.backgrounds.findIndex(
				(b) => b.id === event.detail.backgroundId
			);
			if (backgroundIndex === -1) return store;
			let advantageAtIndex = store.backgrounds[backgroundIndex]?.advantages;
			if (!advantageAtIndex) {
				advantageAtIndex = [];
			}

			const advantageIndex = advantageAtIndex.findIndex((a) => a.name === event.detail.name);
			let oldValue = 0;

			if (advantageIndex === -1 && advantageAtIndex && Array.isArray(advantageAtIndex)) {
				if (isNotNullOrUndefined(store.backgrounds[backgroundIndex].advantages)) {
					store.backgrounds[backgroundIndex].advantages = [
						...store.backgrounds[backgroundIndex].advantages,
						{ id: event.detail.advantageId, name: event.detail.name, value: event.detail.value }
					];
				}
			} else {
				if (isNotNullOrUndefined(store.backgrounds[backgroundIndex].advantages)) {
					oldValue = store.backgrounds[backgroundIndex].advantages[advantageIndex].value;
					store.backgrounds[backgroundIndex].advantages[advantageIndex].value = event.detail.value;
				}
			}

			if (oldValue > event.detail.value) {
				cleanUpExperienceLogFlat(
					event.detail.advantageId,
					event.detail.name,
					event.detail.value,
					oldValue,
					3,
					'Background Advantage'
				);
			} else {
				if (oldValue === event.detail.value) return store;

				store.experience = [
					...store.experience,
					{
						element_id: event.detail.advantageId,
						reason: `Increased Background Advantage ${event.detail.name} to ${event.detail.value}`,
						type: 'substract',
						value: calculateFlatCost(oldValue, event.detail.value, 3),
						date: new Date()
					}
				];
			}

			return store;
		});
	}

	function deleteBackgroundAdvantage(event: CustomEvent<BackgroundAdvantageDeleteEvent>) {
		characterCreationStore.update((store) => {
			const backgroundIndex = store.backgrounds.findIndex(
				(background) => background.id === event.detail.id
			);
			if (backgroundIndex === -1) return store;

			if (!store.backgrounds[backgroundIndex].advantages) return store;

			store.backgrounds[backgroundIndex].advantages = store.backgrounds[
				backgroundIndex
			].advantages?.filter((advantage) => advantage.name !== event.detail.advantageName);

			if (store.backgrounds[backgroundIndex].advantages?.length === 0) {
				store.backgrounds[backgroundIndex].advantages = undefined;
			}

			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Background Advantage ${event.detail.advantageName}`)
			);
			return store;
		});

		selectedWhatIncreaseOption = undefined;
		amountInWhatIncreaseOption = getListToIncrease()?.length ?? 0;
	}

	function addMerit() {
		if (!selectedWhatIncreaseOption) return;

		characterCreationStore.update((store) => {
			const id = generateId();

			const merit: PlayerMerit & { id: string } = {
				id,
				name: meritName.parse(selectedWhatIncreaseOption),
				value: getApplicableMeritLevels(meritName.parse(selectedWhatIncreaseOption))[0]
			};

			if (!store.merits) {
				store.merits = [];
			}

			store.merits = [...store.merits, merit];

			store.experience = [
				...store.experience,
				{
					element_id: id,
					reason: `Added Merit ${selectedWhatIncreaseOption}`,
					type: 'substract',
					value: getApplicableMeritLevels(meritName.parse(selectedWhatIncreaseOption))[0] * 3,
					date: new Date()
				}
			];

			return store;
		});

		selectedWhatIncreaseOption = undefined;
	}

	function updateMeritLinkedSkill(
		event: CustomEvent<{ id: string; linkedSkill: SkillName | undefined }>
	) {
		characterCreationStore.update((store) => {
			if (!store.merits) return store;

			const index = store.merits.findIndex((m) => m.id === event.detail.id);
			if (index === -1) return store;

			store.merits[index].linkedSkill = event.detail.linkedSkill;

			return store;
		});
	}

	function updateMeritDescription(
		event: CustomEvent<{ id: string; description: string | undefined }>
	) {
		characterCreationStore.update((store) => {
			if (!store.merits) return store;

			const index = store.merits.findIndex((m) => m.id === event.detail.id);
			if (index === -1) return store;

			store.merits[index].description = event.detail.description;

			return store;
		});
	}

	function updateMeritValue(event: CustomEvent<{ id: string; label: MeritName; value: number }>) {
		characterCreationStore.update((store) => {
			if (!store.merits) return store;

			const toEditIndex = store.merits.findIndex((b) => b.id === event.detail.id);
			if (toEditIndex === -1) return store;

			let oldValue = store.merits[toEditIndex].value;
			store.merits[toEditIndex].value = event.detail.value;
			if (oldValue > event.detail.value) {
				cleanUpExperienceLogFlat(
					event.detail.id,
					event.detail.label,
					event.detail.value,
					oldValue,
					3,
					'Merit'
				);
			} else {
				if (oldValue === event.detail.value) return store;

				store.experience = [
					...store.experience,
					{
						element_id: event.detail.id,
						reason: `Increased Merit ${event.detail.label} to ${event.detail.value}`,
						type: 'substract',
						value: calculateFlatCost(oldValue, event.detail.value, 3),
						date: new Date()
					}
				];
			}

			return store;
		});
	}

	function deleteMerit(event: CustomEvent<{ id: string }>) {
		characterCreationStore.update((store) => {
			if (!store.merits) return store;

			const indexToRemove = store.merits.findIndex((b) => b.id === event.detail.id);
			if (indexToRemove === -1) return store;

			store.merits = store.merits.filter((m) => m.id !== event.detail.id);
			store.experience = store.experience.filter((exp) => exp.element_id !== event.detail.id);
			return store;
		});
	}

	function toggleLoresheetLevel(event: CustomEvent<{ level: 1 | 2 | 3 }>) {
		const loresheet = $characterCreationStore.loresheet;
		if (!loresheet) return;

		characterCreationStore.update((store) => {
			if (!loresheet.values) {
				loresheet.values = [event.detail.level];
			} else {
				if (loresheet.values.includes(event.detail.level)) {
					loresheet.values = loresheet.values.filter((e) => e !== event.detail.level);
					cleanUpExperienceLogFlat('0', loresheet.name, 0, event.detail.level, 3, 'Loresheet');
				} else {
					loresheet.values.push(event.detail.level);
					store.experience = [
						...store.experience,
						{
							reason: `Selected Loresheet ${loresheet.name} Level ${event.detail.level}`,
							type: 'substract',
							value: calculateFlatCost(0, event.detail.level, 3),
							date: new Date()
						}
					];
				}
			}

			return {
				...store,
				loresheet: loresheet
			};
		});

		const fixedLoresheetBackgrounds = checkForFixedBackgrounds(
			loresheet.name,
			event.detail.level === 1 ? 'level1' : event.detail.level === 2 ? 'level2' : 'level3'
		);

		if (fixedLoresheetBackgrounds.length > 0) {
			if ($characterCreationStore.loresheet?.values.includes(event.detail.level)) {
				fixedLoresheetBackgrounds.forEach((change) => {
					backgroundPaymentStore.addFixedBackground(
						backgroundName.parse(change.name),
						change.value,
						change.sphereOfInfluence,
						change.associatedAdvantages,
						false
					);
				});
			} else {
				fixedLoresheetBackgrounds.forEach((change) => {
					backgroundPaymentStore.removeFixedBackground(backgroundName.parse(change.name));
				});
			}
		}

		const merits = checkForMerits(
			loresheet.name,
			event.detail.level === 1 ? 'level1' : event.detail.level === 2 ? 'level2' : 'level3'
		);

		if (merits.length > 0) {
			if ($characterCreationStore.loresheet?.values.includes(event.detail.level)) {
				merits.forEach((merit) => {
					const id = generateId();
					characterCreationStore.update((store) => {
						if (!store.merits) {
							store.merits = [];
						}

						store.merits.push({
							id,
							name: meritName.parse(merit.name),
							value: merit.value
						});

						return store;
					});

					backgroundPaymentStore.addLoresheetLevel(id, event.detail.level);
				});
			} else {
				const meritsToRemove = backgroundPaymentStore.getLoreSheetLevel(event.detail.level);
				meritsToRemove.forEach((change) => {
					characterCreationStore.update((store) => {
						store.merits = store.merits?.filter((e) => e.id !== change.id);

						return store;
					});
				});
				backgroundPaymentStore.removeLoresheetLevel(event.detail.level);
			}
		} else {
			backgroundPaymentStore.addLoresheetLevel(generateId(), event.detail.level);
		}
	}

	function addDiscipline(isGhoul = false) {
		if (!selectedWhatIncreaseOption) return;

		characterCreationStore.update((store) => {
			const discipline: PlayerDiscipline = {
				name: disciplineName.parse(selectedWhatIncreaseOption),
				value: 1,
				powers: []
			};

			store.disciplines = [...store.disciplines, discipline];

			store.experience = [
				...store.experience,
				{
					reason: `Added Discipline ${selectedWhatIncreaseOption}`,
					type: 'substract',
					value:
						1 *
						getDisciplineCostFactor(
							disciplineName.parse(selectedWhatIncreaseOption),
							$characterCreationStore.clan,
							isGhoul
						),
					date: new Date()
				}
			];

			return store;
		});

		const listToIncrease = getListToIncrease();
		selectedWhatIncreaseOption = listToIncrease ? listToIncrease[0] : undefined;
	}

	function updateDiscipline(
		event: CustomEvent<{ name: DisciplineName; label: string; value: number }>
	) {
		deleteDiscipline(event);

		characterCreationStore.update((store) => {
			const discipline: PlayerDiscipline = {
				name: event.detail.name,
				value: 1,
				powers: []
			};

			store.disciplines = [...store.disciplines, discipline];

			store.experience = [
				...store.experience,
				{
					reason: `Added Discipline ${event.detail.name}`,
					type: 'substract',
					value: 1 * getDisciplineCostFactor(event.detail.name, $characterCreationStore.clan),
					date: new Date()
				}
			];

			return store;
		});
	}

	function updateDisciplineValue(
		event: CustomEvent<{ name: DisciplineName; new: number; old: number }>
	) {
		const clan = $characterCreationStore.clan;
		if (!clan) return;

		characterCreationStore.update((store) => {
			if (event.detail.old > event.detail.new) {
				cleanUpExperienceLog(
					event.detail.name,
					event.detail.new,
					event.detail.old,
					getDisciplineCostFactor(event.detail.name, clan),
					'Discipline'
				);

				if (event.detail.name === 'Blood Sorcery') {
					store.rituals.forEach((ritual) => {
						const config = bloodSorceryRitualConfig.rituals[ritual];
						if (!config) return;

						if (config.level > event.detail.new) {
							store.experience = store.experience.filter(
								(exp) => !exp.reason.match(`Blood Sorcery Ritual ${ritual}`)
							);

							store.rituals = store.rituals.filter((r) => r !== ritual);
						}
					});
				} else if (event.detail.name === 'Oblivion') {
					store.ceremonies.forEach((ceremony) => {
						const config = ceremoniesConfig.ceremonies[ceremony];
						if (!config) return;

						if (config.level > event.detail.new) {
							store.experience = store.experience.filter(
								(exp) => !exp.reason.match(`Oblivion Ceremony ${ceremony}`)
							);

							store.ceremonies = store.ceremonies.filter((r) => r !== ceremony);
						}
					});
				}
			} else {
				if (event.detail.old === event.detail.new) return store;

				store.experience = [
					...store.experience,
					{
						reason: `Increased Discipline ${event.detail.name} to ${event.detail.new}`,
						type: 'substract',
						value: calculateFactorCost(
							event.detail.old,
							event.detail.new,
							getDisciplineCostFactor(event.detail.name, clan)
						),
						date: new Date()
					}
				];
			}

			return store;
		});
	}

	function deleteDiscipline(event: CustomEvent<{ name: DisciplineName | undefined }>) {
		characterCreationStore.update((store) => {
			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Discipline ${event.detail.name}`)
			);
			return store;
		});
		const listToIncrease = getListToIncrease();
		selectedWhatIncreaseOption = listToIncrease ? listToIncrease[0] : undefined;
	}

	function addThinBloodFormula(
		event: CustomEvent<{
			id: string;
			name: RitualDisciplinePowerUnion;
			level: number;
		}>
	) {
		characterCreationStore.update((store) => {
			store.experience = [
				...store.experience,
				{
					element_id: event.detail.id,
					reason: `Added Thin-Blood Alchemy Formula ${event.detail.name}`,
					type: 'substract',
					value: 4 * event.detail.level,
					date: new Date()
				}
			];

			return store;
		});

		selectedWhatIncreaseOption = undefined;
	}

	function removeThinBloodFormula(
		event: CustomEvent<{
			id: string;
			name: RitualDisciplinePowerUnion;
		}>
	) {
		characterCreationStore.update((store) => {
			store.experience = store.experience.filter((exp) => exp.element_id !== event.detail.id);

			return store;
		});
	}

	function handleAddBloodSorceryRitualPowers(
		event: CustomEvent<{ new: BloodSorceryRitualName }>,
		free = false
	) {
		const ritualLevel = getBloodSorceryRitualLevel(event.detail.new);
		if (!ritualLevel) return;

		addBloodSorceryRitualPowers(event);

		if (!free) {
			characterCreationStore.update((store) => {
				store.experience = [
					...store.experience,
					{
						reason: `Added Blood Sorcery Ritual ${event.detail.new}`,
						type: 'substract',
						value: 3 * ritualLevel,
						date: new Date()
					}
				];

				return store;
			});
		}
	}

	function handleUpdateBloodSorceryRitualPowers(
		event: CustomEvent<{
			old: BloodSorceryRitualName | undefined;
			new: BloodSorceryRitualName;
		}>
	) {
		const ritualLevel = getBloodSorceryRitualLevel(event.detail.new);
		if (!ritualLevel) return;
		if (!event.detail.old) return;

		const deleteEvent = new CustomEvent<{ name: BloodSorceryRitualName }>('deleteRitualPower', {
			detail: { name: event.detail.old }
		});
		deleteBloodSorceryRitualPowers(deleteEvent);
		characterCreationStore.update((store) => {
			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Blood Sorcery Ritual ${event.detail.old}`)
			);

			return store;
		});

		const addEvent = new CustomEvent<{ new: BloodSorceryRitualName }>('addRitualPower', {
			detail: { new: event.detail.new }
		});
		addBloodSorceryRitualPowers(addEvent);
		characterCreationStore.update((store) => {
			store.experience = [
				...store.experience,
				{
					reason: `Added Blood Sorcery Ritual ${event.detail.new}`,
					type: 'substract',
					value: 3 * ritualLevel,
					date: new Date()
				}
			];

			return store;
		});
	}

	function handleDeleteBloodSorceryRitualPowers(
		event: CustomEvent<{ name: BloodSorceryRitualName }>
	) {
		deleteBloodSorceryRitualPowers(event);
		characterCreationStore.update((store) => {
			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Blood Sorcery Ritual ${event.detail.name}`)
			);

			return store;
		});
	}

	function handleAddOblivionCeremonyPowers(
		event: CustomEvent<{ new: OblivionCeremonyName }>,
		free = false
	) {
		const ceremonyLevel = getOblivionCeremonyLevel(event.detail.new);
		if (!ceremonyLevel) return;

		addOblivionCeremonyPowers(event);

		if (!free) {
			characterCreationStore.update((store) => {
				store.experience = [
					...store.experience,
					{
						reason: `Added Oblivion Ceremony ${event.detail.new}`,
						type: 'substract',
						value: 3 * ceremonyLevel,
						date: new Date()
					}
				];

				return store;
			});
		}
	}

	function handleUpdateOblivionCeremonyPowers(
		event: CustomEvent<{
			old: OblivionCeremonyName | undefined;
			new: OblivionCeremonyName;
		}>
	) {
		const ceremonyLevel = getOblivionCeremonyLevel(event.detail.new);
		if (!ceremonyLevel) return;
		if (!event.detail.old) return;

		const deleteEvent = new CustomEvent<{ name: OblivionCeremonyName }>('deleteCeremonyPower', {
			detail: { name: event.detail.old }
		});
		deleteOblivionCeremonyPowers(deleteEvent);

		characterCreationStore.update((store) => {
			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Oblivion Ceremony ${event.detail.old}`)
			);

			return store;
		});

		const addEvent = new CustomEvent<{ new: OblivionCeremonyName }>('addCeremonyPower', {
			detail: { new: event.detail.new }
		});
		addOblivionCeremonyPowers(addEvent);
		characterCreationStore.update((store) => {
			store.experience = [
				...store.experience,
				{
					reason: `Added Oblivion Ceremony ${event.detail.new}`,
					type: 'substract',
					value: 3 * ceremonyLevel,
					date: new Date()
				}
			];

			return store;
		});
	}

	function handleDeleteOblivionCeremonyPowers(event: CustomEvent<{ name: OblivionCeremonyName }>) {
		deleteOblivionCeremonyPowers(event);
		characterCreationStore.update((store) => {
			store.experience = store.experience.filter(
				(exp) => !exp.reason.match(`Oblivion Ceremony ${event.detail.name}`)
			);

			return store;
		});
	}

	function updateHumanity(value: number | undefined) {
		if (value === undefined) return;

		characterCreationStore.update((store) => {
			const oldValue = store.humanity.value;
			store.humanity.value = value;

			if (oldValue > value) {
				cleanUpExperienceLog('Humanity', value, oldValue, 3, 'Humanity');
			} else {
				if (oldValue === value) return store;

				store.experience = [
					...store.experience,
					{
						reason: `Increased Humanity to ${value}`,
						type: 'substract',
						value: calculateFactorCost(oldValue, value, 3),
						date: new Date()
					}
				];
			}

			return store;
		});
	}

	function getPaidHumanityUpgrades() {
		let totalIncreases = 0;

		$characterCreationStore.experience.forEach((line) => {
			const match = line.reason.match(/Increased Humanity to (\d+)/);
			if (match) {
				const targetLevel = parseInt(match[1], 10);

				// Calculate the number of upgrades by iterating level-by-level
				let levelCost = 0;
				let currentLevel = targetLevel;

				// Calculate the total expected value for each increment
				while (levelCost < line.value) {
					levelCost += currentLevel * 3;
					if (levelCost <= line.value) {
						totalIncreases += 1;
					}
					currentLevel -= 1;
				}
			}
		});

		return totalIncreases;
	}

	function calculateFactorCost(oldValue: number, newValue: number, factor: number) {
		const numbers = createNumberList(newValue, oldValue + 1);

		return numbers.reduce((acc, curr) => {
			acc += curr * factor;
			return acc;
		}, 0);
	}

	function calculateFlatCost(oldValue: number, newValue: number, cost: number) {
		return (newValue - oldValue) * cost;
	}

	function cleanUpExperienceLog(
		name: string,
		newValue: number,
		oldValue: number,
		factor: number,
		kind: 'Skill' | 'Attribute' | 'Discipline' | 'Humanity'
	) {
		let spentPoints = 0;

		const parsedExpLog = $characterCreationStore.experience
			.filter(
				(e) =>
					(kind !== 'Humanity' ? e.reason.match(`${kind} ${name}`) : e.reason.match(`${kind}`)) &&
					e.type === 'substract'
			)
			.sort((a, b) => b.date.getTime() - a.date.getTime())
			.map((e) => {
				const hasAmount = e.reason.match(/(\d+)/);
				return {
					index: $characterCreationStore.experience.indexOf(e),
					targetValue: hasAmount ? +hasAmount[0] : 1,
					spentPoints: e.value
				};
			});

		for (const expEntry of parsedExpLog) {
			spentPoints = expEntry.spentPoints;
			const reduction = createNumberList(oldValue, newValue + 1).reduce((acc, curr) => {
				acc += curr * factor;
				return acc;
			}, 0);
			spentPoints -= reduction;

			if (spentPoints <= 0) {
				characterCreationStore.update((store) => {
					store.experience.splice(expEntry.index, 1);
					return store;
				});

				if (spentPoints < 0) {
					cleanUpExperienceLog(name, newValue, Math.abs(spentPoints) / factor, factor, kind);
				}
				break;
			} else {
				characterCreationStore.update((store) => {
					store.experience[expEntry.index].value = spentPoints;
					store.experience[expEntry.index].reason = `Increased ${kind} ${name} to ${newValue}`;
					return store;
				});
				break;
			}
		}
	}

	function cleanUpExperienceLogFlat(
		id: string,
		name: string,
		newValue: number,
		oldValue: number,
		flatCost: number,
		kind: 'Background' | 'Background Advantage' | 'Merit' | 'Loresheet'
	) {
		let spentPoints = 0;
		let parsedExpLog: { index: number; targetValue: number; spentPoints: number }[];

		if (kind === 'Background' || kind === 'Merit') {
			parsedExpLog = $characterCreationStore.experience
				.filter((e) => e.element_id === id && e.type === 'substract')
				.sort((a, b) => b.date.getTime() - a.date.getTime())
				.map((e) => {
					const hasAmount = e.reason.match(/(\d+)/);
					return {
						index: $characterCreationStore.experience.indexOf(e),
						targetValue: hasAmount ? +hasAmount[0] : 1,
						spentPoints: e.value
					};
				});
		} else if (kind === 'Background Advantage') {
			parsedExpLog = $characterCreationStore.experience
				.filter((e) => e.reason.match(`${kind} ${name}`) && e.type === 'substract')
				.sort((a, b) => b.date.getTime() - a.date.getTime())
				.map((e) => {
					const hasAmount = e.reason.match(/(\d+)/);
					return {
						index: $characterCreationStore.experience.indexOf(e),
						targetValue: hasAmount ? +hasAmount[0] : 1,
						spentPoints: e.value
					};
				});
		} else if (kind === 'Loresheet') {
			characterCreationStore.update((store) => {
				store.experience = store.experience.filter(
					(e) => !e.reason.match(`${kind} ${name} Level ${oldValue}`) && e.type === 'substract'
				);
				return store;
			});
			return;
		} else {
			return;
		}

		for (const expEntry of parsedExpLog) {
			spentPoints = expEntry.spentPoints;
			const reduction = (oldValue - newValue) * flatCost;
			spentPoints -= reduction;

			if (spentPoints <= 0) {
				characterCreationStore.update((store) => {
					store.experience.splice(expEntry.index, 1);
					return store;
				});

				if (spentPoints < 0) {
					cleanUpExperienceLogFlat(id, name, newValue, Math.abs(spentPoints), flatCost, kind);
				}
				break;
			} else {
				characterCreationStore.update((store) => {
					store.experience[expEntry.index].value = spentPoints;
					store.experience[expEntry.index].reason = `Increased ${kind} ${name} to ${newValue}`;
					return store;
				});
				break;
			}
		}
	}

	function isNotFreebieDiscipline(discipline: DisciplineName) {
		return !disciplineFreebieStore.getDiscipline(discipline);
	}
</script>

<svelte:window bind:innerWidth />

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
	<Tracker title="Experience Total" value={xpGained} />
	<Tracker title="Experience Spent" value={xpSpent} />
	<div class="sm:col-span-2 xl:col-span-1">
		<Tracker title="Experience Left" value={xpLeft} />
	</div>
</div>

<div class="mt-4 grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
	<label class="label">
		<span>What do you want to increase?</span>

		{#key selectedWhatIncreaseOption}
			<select
				class="select rounded-lg"
				bind:value={selectedKindIncreaseOption}
				on:change={adjustWhatIncreaseSelectionBox}
			>
				<option disabled selected value={undefined}> What to you want to increase? </option>
				{#each getIncreaseKind() as increaseKindOption}
					<option
						selected={selectedKindIncreaseOption === increaseKindOption}
						value={increaseKindOption}
					>
						{increaseKindOption}
					</option>
				{/each}
			</select>
		{/key}
	</label>
	{#key $characterCreationStore.disciplines.length}
		{#if selectedKindIncreaseOption && selectedKindIncreaseOption !== 'Attribute' && selectedKindIncreaseOption !== 'Loresheet' && selectedKindIncreaseOption !== 'Ritual' && selectedKindIncreaseOption !== 'Ceremony' && selectedKindIncreaseOption != 'Thin-Blood Formula' && selectedKindIncreaseOption !== 'Humanity' && (getListToIncrease()?.length ?? 0) > 0}
			<label class="label">
				{#if selectedKindIncreaseOption === 'Skill'}
					<span> What skill do you want to add? </span>
				{:else if selectedKindIncreaseOption === 'Discipline' || selectedKindIncreaseOption === 'Level 1 Discipline Power'}
					<span> What discipline do you want to add? </span>
				{:else}
					<span> What exactly do you want to increase? </span>
				{/if}

				{#key `${selectedKindIncreaseOption}-${selectedWhatIncreaseOption}-${amountInWhatIncreaseOption}-${$characterCreationStore.disciplines.length}-${getListToIncrease()?.length}}`}
					<select
						class="select rounded-lg"
						disabled={!selectedKindIncreaseOption}
						bind:value={selectedWhatIncreaseOption}
					>
						{#if selectedKindIncreaseOption === 'Skill'}
							<option disabled selected value={undefined}> What skill do you want to add? </option>
						{:else if selectedKindIncreaseOption === 'Discipline' || selectedKindIncreaseOption === 'Level 1 Discipline Power'}
							<option disabled selected value={undefined}>
								What discipline do you want to add?
							</option>
						{:else}
							<option disabled selected value={undefined}>
								What exactly do you want to increase?
							</option>
						{/if}

						{#each getListToIncrease() ?? [] as increaseOption}
							<option
								selected={selectedWhatIncreaseOption === increaseOption}
								value={increaseOption}
							>
								{increaseOption}
							</option>
						{/each}
					</select>
				{/key}
			</label>
		{/if}
	{/key}

	{#if selectedKindIncreaseOption === 'Humanity'}
		<label class="label">
			<span>Target Amount</span>

			<select
				class="select rounded-lg"
				disabled={!selectedKindIncreaseOption}
				bind:value={selectWhatIncreaseAmountOption}
			>
				<option disabled selected value={undefined}> Please select the target amount! </option>
				{#key selectedWhatIncreaseOption}
					{#each getIncreaseOptions() as increaseAmount}
						<option
							selected={selectWhatIncreaseAmountOption === increaseAmount}
							value={increaseAmount}
						>
							{increaseAmount}
						</option>
					{/each}
				{/key}
			</select>
		</label>
	{:else if selectedKindIncreaseOption === 'Skill'}
		<button
			class="variant-filled-primary btn rounded-lg"
			disabled={xpLeft <= 0}
			type="button"
			on:click={addSkill}
		>
			Add
		</button>
	{:else if selectedKindIncreaseOption === 'Background'}
		<button
			class="variant-filled-primary btn rounded-lg"
			disabled={xpLeft <= 0}
			type="button"
			on:click={handleAddBackground}
		>
			Add
		</button>
	{:else if selectedKindIncreaseOption === 'Merit'}
		<button
			class="variant-filled-primary btn rounded-lg"
			disabled={xpLeft <= 0}
			type="button"
			on:click={addMerit}
		>
			Add
		</button>
	{:else if selectedKindIncreaseOption === 'Discipline'}
		<button
			class="variant-filled-primary btn rounded-lg"
			disabled={!selectedWhatIncreaseOption ||
				(disciplineName.safeParse(selectedWhatIncreaseOption).success === true
					? xpLeft <
						getDisciplineCostFactor(
							disciplineName.parse(selectedWhatIncreaseOption),
							$characterCreationStore.clan
						)
					: true) ||
				!$characterCreationStore.clan}
			type="button"
			on:click={() => addDiscipline()}
		>
			Add
		</button>
	{:else if selectedKindIncreaseOption === 'Level 1 Discipline Power'}
		{#key $characterCreationStore.disciplines.length}
			{#if (getListToIncrease()?.length ?? 0) > 0}
				<button
					class="variant-filled-primary btn rounded-lg"
					disabled={!selectedWhatIncreaseOption ||
						(disciplineName.safeParse(selectedWhatIncreaseOption).success === true
							? xpLeft <
								getDisciplineCostFactor(
									disciplineName.parse(selectedWhatIncreaseOption),
									$characterCreationStore.clan,
									true
								)
							: true) ||
						!$characterCreationStore.clan}
					type="button"
					on:click={() => addDiscipline(true)}
				>
					Add
				</button>
			{/if}
		{/key}
	{/if}
</div>

<div class="mt-4 flex flex-col gap-2">
	{#if selectedKindIncreaseOption === 'Attribute'}
		{#if !attributesPaidWithDotsStore.haveAllAttributeFreebiesBeenUsed()}
			<aside class="alert variant-filled-warning col-span-2 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">
						Please distribute all your free dots for attributes before spending experience points!
					</h3>
					<p>
						As those dots always come first, you cannot spend experience on attributes before you
						have distributed all of them!
					</p>
				</div>
			</aside>
		{:else}
			<EditableAttributes
				displayStyle="dots"
				displayValue={isMobileScreen() ? 'below' : 'beside'}
				editModeEnabled={true}
				playerAttributes={$characterCreationStore.attributes}
				on:valueChange={updateAttribute}
			/>
		{/if}
	{:else if selectedKindIncreaseOption === 'Skill' && $characterCreationStore.skills.length > 0}
		<div class="grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
			{#each $characterCreationStore.skills as skill}
				<EditableSkill
					displayStyle="dots"
					displayValue="beside"
					editModeEnabled={true}
					minValue={skillsPaidWithDotsStore.getSkillsPaidWithDotsByName(skill.name) ?? 1}
					showDeleteButton={!skillsPaidWithDotsStore.hasSkillBeenPaidWithDots(skill.name)}
					{skill}
					on:valueChange={updateSkill}
					on:specializationChange={updateSkillSpecialization}
					on:deleteChange={deleteSkill}
				/>
			{/each}
		</div>
	{:else if selectedKindIncreaseOption === 'Background' && $characterCreationStore.backgrounds.length > 0}
		<div class="grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
			{#each $characterCreationStore.backgrounds as background}
				<EditableBackground
					{background}
					editModeEnabledAdvantages={true}
					mode="experience"
					on:change={(e) => updateBackground(e)}
					on:deleteClick={(e) => deleteBackground(e)}
					on:advantageClick={(e) => updateBackgroundAdvantage(e)}
					on:advantageDeleteClick={(e) => deleteBackgroundAdvantage(e)}
				/>
			{/each}
		</div>
	{:else if selectedKindIncreaseOption === 'Merit' && $characterCreationStore.merits && $characterCreationStore.merits.length > 0}
		<div class="grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-3">
			{#each $characterCreationStore.merits as merit}
				<EditableMerit
					displayStyle="numbers"
					displayValue="below"
					editModeEnabled={getApplicableMeritLevels(merit.name).length > 1}
					editModeLinkedSkillEnabled={true}
					{merit}
					showDeleteButton={!hasBeenPaidWithDots(merit) && !hasBeenGrantedByLoresheet(merit)}
					on:linkedSkillChange={(e) => updateMeritLinkedSkill(e)}
					on:descriptionChange={(e) => updateMeritDescription(e)}
					on:valueChange={(e) => updateMeritValue(e)}
					on:deleteClick={(e) => deleteMerit(e)}
				/>
			{/each}
		</div>
	{:else if selectedKindIncreaseOption === 'Loresheet'}
		{#if !$characterCreationStore.loresheet}
			<aside class="alert variant-filled-warning col-span-2 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">Please select a Loresheet before spending experience points!</h3>
					<p>Without a Loresheet being selected you cannot spend experience points on it!</p>
				</div>
			</aside>
		{:else}
			<EditableLoresheet
				disableFirstOption={backgroundPaymentStore.hasLoresheetLevelBeenPaidWithDots(1)}
				disableSecondOption={backgroundPaymentStore.hasLoresheetLevelBeenPaidWithDots(2)}
				disableThirdOption={backgroundPaymentStore.hasLoresheetLevelBeenPaidWithDots(3)}
				enableLoresheetSelection={false}
				selectedLoresheet={$characterCreationStore.loresheet.name}
				on:toggleLoreSheetLevel={(event) => toggleLoresheetLevel(event)}
			/>
		{/if}
	{:else if selectedKindIncreaseOption === 'Discipline'}
		{#if !$characterCreationStore.clan}
			<aside class="alert variant-filled-warning col-span-2 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">Please select a clan first!</h3>
					<p>You need to have a clan to know your in-clan disciplines!</p>
				</div>
			</aside>
		{:else if $characterCreationStore.clan === 'Thin-Blooded'}
			<aside class="alert variant-filled-warning col-span-2 mb-4 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">Thin-Bloods do not learn Disciplines (the usual way)!</h3>
					<p>
						Thin-blooded characters do not learn Disciplines in the usual way. Whenever a thin-blood
						feeds, they gain one dot in one Discipline associated with the Resonance of the blood
						consumed, together with one level-one power in that Discipline. No additional powers can
						be gained in this way nor can the rating increase with XP. This Discipline choice lasts
						until the thin-blood’s Hunger reaches 5 or the next time the thin-blood feeds.
						Thin-bloods can also learn Thin-Blood Alchemy by purchasing a merit and then spending
						XP. See Thin-Blood Merits, page 187 for more information.
					</p>
				</div>
			</aside>
			{#if hasThinBloodAlchemyMerit()}
				<EditableThinBloodAlchemy disciplineValue={1} dotList={[1]} selectedValue={1} />
			{/if}
		{:else}
			<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
				{#each $characterCreationStore.disciplines as discipline, index}
					<EditableDiscipline
						disableDisciplineSelection={index === 0 || index === 1 || index === 2}
						disciplineValue={discipline.value}
						disciplines={getValidDisciplines(
							$characterCreationStore.clan,
							false,
							$characterCreationStore.merits?.some((e) => e.name === 'Thin-Blood Alchemist')
						)}
						dotList={createNumberList(
							5,
							disciplineFreebieStore.getDiscipline(discipline.name)?.value ?? 1
						)}
						label={`Discipline ${index + 1}`}
						selectedDiscipline={discipline.name}
						selectedValue={discipline.value}
						showDeleteButton={isNotFreebieDiscipline(discipline.name)}
						on:disciplineChange={(e) => updateDiscipline(e)}
						on:disciplineValueChange={(e) => updateDisciplineValue(e)}
						on:disciplineDelete={(e) => deleteDiscipline(e)}
					/>

					{#if innerWidth < ScreenSize.SM}
						<hr />
					{/if}

					{#if (index + 1) % 3 === 0 && index + 1 < $characterCreationStore.disciplines.length}
						<div class="col-span-3 mt-4 border-t-2" />
					{/if}
				{/each}
			</div>
		{/if}
	{:else if selectedKindIncreaseOption === 'Ritual'}
		{#if !$characterCreationStore.clan}
			<aside class="alert variant-filled-warning col-span-2 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">Please select a clan first!</h3>
					<p>You need to have a clan to know your in-clan disciplines!</p>
				</div>
			</aside>
		{:else if !hasBloodSorcery()}
			<aside class="alert variant-filled-warning col-span-2 mb-4 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">This character does not know Blood Sorcery</h3>
					<p>
						Only characters with at least one dot in Blood Sorcery can learn rituals. Please add
						Blood Sorcery before buying rituals.
					</p>
				</div>
			</aside>
		{:else if $characterCreationStore.rituals.length === 0}
			<div class="grid grid-cols-3 gap-2">
				<EditableBloodSorceryRitual
					enableEdit={true}
					existingBloodSorceryRituals={$characterCreationStore.rituals}
					maxLevel={1}
					on:addRitualPower={(e) => handleAddBloodSorceryRitualPowers(e, true)}
				/>
			</div>
		{:else}
			<div class="grid grid-cols-3 gap-2">
				<EditableBloodSorceryRitual
					enableEdit={true}
					existingBloodSorceryRituals={$characterCreationStore.rituals}
					maxLevel={getBloodSorceryLevel()}
					showDeleteButton={true}
					on:addRitualPower={(e) => handleAddBloodSorceryRitualPowers(e)}
					on:changeRitualPower={(e) => handleUpdateBloodSorceryRitualPowers(e)}
					on:deleteRitualPower={(e) => handleDeleteBloodSorceryRitualPowers(e)}
				/>
			</div>
		{/if}
	{:else if selectedKindIncreaseOption === 'Ceremony'}
		{#if !$characterCreationStore.clan}
			<aside class="alert variant-filled-warning col-span-2 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">Please select a clan first!</h3>
					<p>You need to have a clan to know your in-clan disciplines!</p>
				</div>
			</aside>
		{:else if !hasOblivion()}
			<aside class="alert variant-filled-warning col-span-2 mb-4 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">This character does not know Oblivion</h3>
					<p>
						Only characters with at least one dot in Oblivion can learn ceremonies. Please add
						Oblivion before buying rituals.
					</p>
				</div>
			</aside>
		{:else if $characterCreationStore.ceremonies.length === 0}
			<div class="grid grid-cols-3 gap-2">
				<EditableOblivionCeremony
					enableEdit={true}
					existingOblivionCeremonies={$characterCreationStore.ceremonies}
					maxLevel={1}
					on:addCeremonyPower={(e) => handleAddOblivionCeremonyPowers(e, true)}
				/>
			</div>
		{:else}
			<div class="grid grid-cols-3 gap-2">
				<EditableOblivionCeremony
					enableEdit={true}
					existingOblivionCeremonies={$characterCreationStore.ceremonies}
					maxLevel={getOblivionLevel()}
					showDeleteButton={true}
					on:addCeremonyPower={(e) => handleAddOblivionCeremonyPowers(e)}
					on:changeCeremonyPower={(e) => handleUpdateOblivionCeremonyPowers(e)}
					on:deleteCeremonyPower={(e) => handleDeleteOblivionCeremonyPowers(e)}
				/>
			</div>
		{/if}
	{:else if selectedKindIncreaseOption === 'Thin-Blood Formula'}
		{#if $characterCreationStore.clan !== 'Thin-Blooded' && !hasThinBloodAlchemyMerit()}
			<aside class="alert variant-filled-warning col-span-2 mb-4 rounded-lg">
				<div>
					<iconify-icon height="48" icon="mdi:warning" />
				</div>
				<div class="alert-message">
					<h3 class="h3">
						Only Thin-Bloods with the Thin-Blood Alchemist merit may learn Thin-Blood Alchemy
						Formulas
					</h3>
					<p>
						Please add the Thin-Blood Alchemist merit to your character before trying to buy
						Thin-Blood Alchemy Formulas.
					</p>
				</div>
			</aside>
		{:else}
			<div class="grid grid-cols-3 gap-2">
				<EditableThinBloodAlchemy
					disciplineValue={getDisciplineValue('Thin-Blood Alchemy')}
					enableAdditionalFormulas={true}
					selectedValue={getDisciplineValue('Thin-Blood Alchemy')}
					showDisciplinePowerDeleteButton={true}
					on:disciplineValueChange={(e) => updateDisciplineValue(e)}
					on:newFormula={(e) => addThinBloodFormula(e)}
					on:removeFormula={(e) => removeThinBloodFormula(e)}
				/>
			</div>
		{/if}
	{:else if selectedKindIncreaseOption === 'Level 1 Discipline Power' && $characterCreationStore.ghoul === true && $characterCreationStore.clan}
		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
			{#each $characterCreationStore.disciplines as discipline, index}
				<EditableDiscipline
					disableDisciplineSelection={index === 0 || index === 1 || index === 2}
					disciplineValue={$characterCreationStore.disciplines[index].value}
					disciplines={getValidDisciplines($characterCreationStore.clan, true)}
					dotList={createNumberList(5)}
					label={`Discipline ${index + 1}`}
					selectedDiscipline={discipline.name}
					selectedValue={discipline.value}
					showDeleteButton={isNotFreebieDiscipline(discipline.name)}
					on:disciplineChange={(e) => updateDiscipline(e)}
					on:disciplineValueChange={(e) => updateDisciplineValue(e)}
					on:disciplineDelete={(e) => deleteDiscipline(e)}
				/>
			{/each}
		</div>
	{/if}
	{#if selectedKindIncreaseOption === 'Humanity'}
		<button
			class="variant-filled-primary btn w-full rounded-lg sm:col-span-3"
			disabled={!selectWhatIncreaseAmountOption}
			type="button"
			on:click={() => updateHumanity(selectWhatIncreaseAmountOption)}
		>
			Save
		</button>
	{/if}
</div>

<div class="table-container mt-6 rounded-tl-lg rounded-tr-lg">
	<table class="table table-hover w-full table-fixed rounded-tl-lg rounded-tr-lg">
		<colgroup>
			<col style="width: 66.67%;" />
			{#if innerWidth > ScreenSize.SM}
				<col style="width: 16.67%;" />
				<col style="width: 16.67%;" />
			{:else}
				<col style="width: 33.33%;" />
			{/if}
		</colgroup>

		<thead>
			<tr>
				<th>Reason</th>
				{#if innerWidth > ScreenSize.SM}
					<th>Type</th>
				{/if}
				<th class="flex justify-center">Value</th>
			</tr>
		</thead>
		<tbody>
			{#each $characterCreationStore.experience as row}
				<tr>
					<td class="overflow-hidden truncate">
						{row.reason}
					</td>

					{#if innerWidth > ScreenSize.SM}
						<td class="capitalize"> {row.type} </td>
					{/if}

					<td class="flex justify-end !px-[18px] sm:mr-8"> {row.value} </td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan={innerWidth > ScreenSize.SM ? 2 : 1}>Total XP Spent</th>
				<td class="flex justify-end sm:mr-8">{xpSpent}</td>
			</tr>
		</tfoot>
	</table>
</div>
