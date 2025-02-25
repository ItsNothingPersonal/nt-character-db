<script lang="ts">
	import type { BackgroundAdvantageDeleteEvent } from '$lib/components/lotn/characterSheet/components/BackgroundAdvantage/BackgroundAdvantageDeleteEvent';
	import HelpText from '$lib/components/lotn/characterSheet/components/HelpText.svelte';
	import { loresheetConfig } from '$lib/components/lotn/config/loresheetConfig';
	import { predatorTypeConfig } from '$lib/components/lotn/config/predatorTypeConfig';
	import type { BackgroundAdvantageChangeEvent } from '$lib/components/lotn/EditableBackground/BackgroundAdvantageChangeEvent';
	import type { BackgroundDisadvantageChangeEvent } from '$lib/components/lotn/EditableBackground/BackgroundDisadvantageChangeEvent';
	import type { BackgroundChangeEvent } from '$lib/components/lotn/EditableBackground/BackroundChangeEvent';
	import EditableBackground from '$lib/components/lotn/EditableBackground/EditableBackground.svelte';
	import EditableLoresheet from '$lib/components/lotn/EditableLoresheet/EditableLoresheet.svelte';
	import {
		addBackground,
		canOnlyBeBoughtOnce,
		getBackgroundConfig,
		updateBackgroundAdvantageValue
	} from '$lib/components/lotn/util/backgroundUtil';
	import {
		checkForDotBonusBackgrounds,
		checkForFixedBackgrounds,
		checkForMerits
	} from '$lib/components/lotn/util/loresheetUtil';
	import { ScreenSize } from '$lib/sceenSize';
	import {
		backgroundPaymentStore,
		characterCreationStore
	} from '$lib/stores/characterCreationStore';
	import { generateId } from '$lib/util';
	import {
		backgroundAdvantageName,
		type BackgroundAdvantageName
	} from '$lib/zod/lotn/enums/backgroundAdvantageName';
	import type { BackgroundDisadvantageName } from '$lib/zod/lotn/enums/backgroundDisadvantageName';
	import { backgroundName, type BackgroundName } from '$lib/zod/lotn/enums/backgroundName';
	import { type LoresheetName } from '$lib/zod/lotn/enums/loresheetName';
	import { meritName } from '$lib/zod/lotn/enums/meritName';
	import { spheresOfInfluenceName } from '$lib/zod/lotn/enums/spheresOfInfluenceName';
	import { playerLoresheet } from '$lib/zod/lotn/playerCharacter/playerLoresheet';
	import type { LoresheetChangeEntry } from '$lib/zod/lotn/types/loresheetSchema';
	import { get } from 'svelte/store';

	let { maxFreebiePoints, usedFreebiePoints, paymentStore, maxHavenFreebiePoints } =
		backgroundPaymentStore;
	let selectedBackground: BackgroundName;
	let innerWidth = 0;

	$: loresheetConfigEntry = $characterCreationStore.loresheet?.name
		? loresheetConfig[$characterCreationStore.loresheet.name]
		: undefined;

	function handleChange(event: CustomEvent<BackgroundChangeEvent>) {
		const backgroundIndex = $characterCreationStore.backgrounds.findIndex(
			(e) => e.id === event.detail.id
		);
		if (backgroundIndex === -1) return;

		switch (event.detail.type) {
			case 'value':
				if (typeof event.detail.value === 'number') {
					const total = backgroundPaymentStore.getTotalPoints(
						$characterCreationStore.backgrounds[backgroundIndex].id
					);
					let result = false;

					if (event.detail.value > total) {
						result = backgroundPaymentStore.increaseBackground(
							event.detail.id,
							$characterCreationStore.backgrounds[backgroundIndex].name,
							event.detail.value
						);
					} else {
						result = backgroundPaymentStore.decreaseBackground(event.detail.id, event.detail.value);
					}
					if (result) {
						characterCreationStore.update((store) => {
							store.backgrounds[backgroundIndex].value = Number(event.detail.value);

							store.backgrounds[backgroundIndex].advantages?.forEach((advantage) => {
								if (store.backgrounds[backgroundIndex].name === 'Haven') {
									if (
										backgroundPaymentStore.isFixedBackgroundAdvantage(
											store.backgrounds[backgroundIndex].id,
											advantage.name
										)
									) {
										updateBackgroundAdvantageValue(
											store.backgrounds[backgroundIndex].id,
											advantage.id,
											advantage.name,
											backgroundPaymentStore.getFixedBackgroundAdvantageValue(
												store.backgrounds[backgroundIndex].id,
												advantage.name
											) ?? 0
										);
										backgroundPaymentStore.removeHavenBackgroundAdvantage(
											store.backgrounds[backgroundIndex].id,
											advantage.name
										);
									} else if (
										Number(event.detail.value) < total &&
										backgroundPaymentStore.isHavenBackgroundAdvantage(
											store.backgrounds[backgroundIndex].id,
											advantage.name
										)
									) {
										store.backgrounds[backgroundIndex].advantages = store.backgrounds[
											backgroundIndex
										].advantages?.filter((e) => e.name !== advantage.name);
										backgroundPaymentStore.deleteBackgroundAdvantage(
											store.backgrounds[backgroundIndex].id,
											advantage.name
										);
									}
								}
							});
							return store;
						});
					}
				}
				break;
			case 'description':
				if (typeof event.detail.value === 'string') {
					characterCreationStore.update((store) => {
						store.backgrounds[backgroundIndex].description = event.detail.value?.toString();

						return store;
					});
				}
				break;
			case 'sphereOfInfluence':
				if (typeof event.detail.value === 'string') {
					characterCreationStore.update((store) => {
						store.backgrounds[backgroundIndex].sphereOfInfluence = spheresOfInfluenceName.parse(
							event.detail.value
						);
						return store;
					});
				}
				break;
		}
	}

	function handleDeleteClick(event: CustomEvent<BackgroundChangeEvent>) {
		backgroundPaymentStore.deleteBackground(event.detail.id);

		characterCreationStore.update((store) => {
			const index = store.backgrounds.findIndex((item) => item.id === event.detail.id);

			if (index === -1) return store;

			const updatedArray = [...store.backgrounds];
			updatedArray.splice(index, 1);

			return {
				...store,
				backgrounds: updatedArray
			};
		});
	}

	function handleBackgroundAdvantageClick(event: CustomEvent<BackgroundAdvantageChangeEvent>) {
		const backgroundIndex = $characterCreationStore.backgrounds.findIndex(
			(e) => e.id === event.detail.backgroundId
		);
		if (backgroundIndex === -1) return;
		if (!event.detail.name) return;
		if (!event.detail.value) return;

		const advantageName: BackgroundAdvantageName = event.detail.name;
		const advantageValue: number = event.detail.value;

		const total = backgroundPaymentStore.getTotalAdvantagePoints(
			$characterCreationStore.backgrounds[backgroundIndex].id,
			advantageName
		);
		let result = false;

		if (event.detail.value > total) {
			result = backgroundPaymentStore.increaseBackgroundAdvantage(
				event.detail.backgroundId,
				event.detail.backgroundName,
				advantageName,
				advantageValue
			);
		} else {
			result = backgroundPaymentStore.decreaseBackgroundAdvantage(
				event.detail.backgroundId,
				advantageName,
				advantageValue
			);
		}

		if (result) {
			characterCreationStore.update((store) => {
				if (!store.backgrounds[backgroundIndex].advantages) {
					store.backgrounds[backgroundIndex].advantages = [];
				}

				const advantageIndex = store.backgrounds[backgroundIndex].advantages.findIndex(
					(e) => e.name === advantageName
				);

				if (advantageIndex === -1) {
					store.backgrounds[backgroundIndex].advantages = [
						...store.backgrounds[backgroundIndex].advantages,
						{
							id: generateId(),
							name: advantageName,
							value: advantageValue
						}
					];
				} else {
					const advantage = store.backgrounds[backgroundIndex].advantages[advantageIndex];
					advantage.value = advantageValue;
					store.backgrounds[backgroundIndex].advantages[advantageIndex] = advantage;
				}

				return store;
			});
		}
	}

	function handleBackgroundAdvantageDeleteClick(
		event: CustomEvent<BackgroundAdvantageDeleteEvent>
	) {
		// Entferne Abrechnung
		backgroundPaymentStore.deleteBackgroundAdvantage(event.detail.id, event.detail.advantageName);

		// Entferne Vorteil vom Charakter
		characterCreationStore.update((store) => {
			const background = store.backgrounds.find((e) => e.id === event.detail.id);
			const indexBackground = store.backgrounds.findIndex((item) => item.id === event.detail.id);

			if (indexBackground === -1) return store;
			if (!background) return store;
			if (!background.advantages) return store;

			const indexBackgroundAdvantage = background.advantages.findIndex(
				(item) => item.name === event.detail.advantageName
			);

			if (indexBackgroundAdvantage === -1) return store;

			background.advantages.splice(indexBackgroundAdvantage, 1);

			if (background.advantages.length === 0) {
				background.advantages = undefined;
			}

			const updatedArray = [...store.backgrounds];
			updatedArray[indexBackground] = { ...updatedArray[indexBackground], ...background };

			return {
				...store,
				backgrounds: updatedArray
			};
		});
	}

	function handleBackgroundDisadvantageClick(
		event: CustomEvent<BackgroundDisadvantageChangeEvent>
	) {
		if (!event.detail.name) return;
		if (!event.detail.value) return;

		const disadvantageName: BackgroundDisadvantageName = event.detail.name;
		const disadvantageValue: number = event.detail.value;

		characterCreationStore.update((store) => {
			const background = store.backgrounds.find((e) => e.id === event.detail.backgroundId);
			const indexBackground = store.backgrounds.findIndex(
				(item) => item.id === event.detail.backgroundId
			);

			if (indexBackground === -1) return store;
			if (!background) return store;

			if (!background.disadvantages) {
				background.disadvantages = [];
			}

			const indexBackgroundDisadvantage = background.disadvantages.findIndex(
				(item) => item.name === disadvantageName
			);

			if (indexBackgroundDisadvantage === -1) {
				background.disadvantages.push({ name: disadvantageName, value: disadvantageValue });
			} else {
				background.disadvantages = background.disadvantages?.map((e) =>
					e.name === disadvantageName ? { name: e.name, value: disadvantageValue } : e
				);
			}

			const updatedArray = [...store.backgrounds];
			updatedArray[indexBackground] = { ...updatedArray[indexBackground], ...background };

			return {
				...store,
				backgrounds: updatedArray
			};
		});
	}

	function handleBackgroundDisadvantageDeleteClick(
		event: CustomEvent<BackgroundDisadvantageChangeEvent>
	) {
		characterCreationStore.update((store) => {
			const background = store.backgrounds.find((e) => e.id === event.detail.backgroundId);
			const indexBackground = store.backgrounds.findIndex(
				(item) => item.id === event.detail.backgroundId
			);

			if (indexBackground === -1) return store;
			if (!background) return store;
			if (!background.disadvantages) return store;
			if (!event.detail.value) return store;
			if (
				!backgroundPaymentStore.canRemoveBackgroundDisadvantage(
					event.detail.value,
					get(paymentStore).backgrounds.reduce((acc, entry) => acc + entry.freebies, 0),
					get(paymentStore).associatedAdvantages.reduce((acc, entry) => acc + entry.freebies, 0)
				)
			)
				return store;

			const indexBackgroundDisadvantage = background.disadvantages.findIndex(
				(item) => item.name === event.detail.name
			);

			if (indexBackgroundDisadvantage === -1) return store;

			background.disadvantages.splice(indexBackgroundDisadvantage, 1);

			if (background.disadvantages.length === 0) {
				background.disadvantages = undefined;
			}

			const updatedArray = [...store.backgrounds];
			updatedArray[indexBackground] = { ...updatedArray[indexBackground], ...background };

			return {
				...store,
				backgrounds: updatedArray
			};
		});
	}

	function getBackgroundPredatorEntries() {
		if (!$characterCreationStore.predatorType) return [];
		return predatorTypeConfig[$characterCreationStore.predatorType].changes.filter(
			(e) => e.kind === 'Background'
		);
	}

	function getBackgroundLoresheetEntries(loresheet: LoresheetName) {
		let level1: LoresheetChangeEntry[] = [];
		if ($characterCreationStore.loresheet?.values?.includes(1)) {
			level1 = (loresheetConfig[loresheet].level1.changes ?? []).filter(
				(e) => e.kind === 'Background' && e.fixed !== true
			);
		}

		let level2: LoresheetChangeEntry[] = [];
		if ($characterCreationStore.loresheet?.values?.includes(2)) {
			level2 = (loresheetConfig[loresheet].level2.changes ?? []).filter(
				(e) => e.kind === 'Background' && e.fixed !== true
			);
		}

		let level3: LoresheetChangeEntry[] = [];
		if ($characterCreationStore.loresheet?.values?.includes(3)) {
			level3 = (loresheetConfig[loresheet].level3.changes ?? []).filter(
				(e) => e.kind === 'Background' && e.fixed !== true
			);
		}

		return [...level1, ...level2, ...level3];
	}

	function getLoresheetConfigEntryByBackgroundName(name: BackgroundName) {
		if (!$characterCreationStore.loresheet?.name) return;

		const level1 = (
			loresheetConfig[$characterCreationStore.loresheet.name].level1.changes ?? []
		).find((e) => (Array.isArray(e.name) ? e.name.some((x) => x.includes(name)) : e.name === name));
		if (level1) {
			return level1;
		}

		const level2 = (
			loresheetConfig[$characterCreationStore.loresheet.name].level2.changes ?? []
		).find((e) => (Array.isArray(e.name) ? e.name.some((x) => x.includes(name)) : e.name === name));
		if (level2) {
			return level2;
		}

		const level3 = (
			loresheetConfig[$characterCreationStore.loresheet.name].level3.changes ?? []
		).find((e) => (Array.isArray(e.name) ? e.name.some((x) => x.includes(name)) : e.name === name));
		if (level3) {
			return level3;
		}
	}

	function getLoresheetConfigEntryByBackgroundNameArray(backgroundNames: BackgroundName[]) {
		if (!$characterCreationStore.loresheet?.name) return;

		for (const backgroundName of backgroundNames) {
			const result = getLoresheetConfigEntryByBackgroundName(backgroundName);

			if (result) {
				return result;
			}
		}
	}

	function getPredatorConfigEntryByBackgroundName(name: BackgroundName) {
		if (!$characterCreationStore.predatorType) return;

		return predatorTypeConfig[$characterCreationStore.predatorType].changes.find((e) =>
			Array.isArray(e.name) ? e.name.includes(name) : e.name === name
		);
	}

	function getPredatorConfigEntryByBackgroundNameArray(names: BackgroundName[]) {
		for (const background of names) {
			const entry = getPredatorConfigEntryByBackgroundName(background);

			if (entry) {
				return entry;
			}
		}
	}

	function getDescription(input: BackgroundName) {
		return getBackgroundConfig(input).description;
	}

	function getAssociatedAdvantageDescription(
		background: BackgroundName,
		input: BackgroundAdvantageName
	) {
		const advantages = getBackgroundConfig(background).advantages;
		if (!advantages) return;
		if (!advantages[input]) return;

		return advantages[input]?.levelVariable
			? advantages[input]?.levelVariable
			: advantages[input]?.description;
	}

	function setLoresheet(loresheet: LoresheetName | undefined) {
		if (loresheet) {
			characterCreationStore.update((store) => {
				return {
					...store,
					loresheet: playerLoresheet.parse({
						name: loresheet,
						values: []
					})
				};
			});
		} else {
			characterCreationStore.update((store) => {
				return {
					...store,
					loresheet: undefined
				};
			});
		}
	}

	function toggleLoresheetLevel(level: 1 | 2 | 3) {
		const loresheet = $characterCreationStore.loresheet;
		if (!loresheet) return;

		if (backgroundPaymentStore.getFreebiePointsLeft() < level) {
			return;
		}

		characterCreationStore.update((store) => {
			if (!loresheet.values) {
				loresheet.values = [level];
			} else {
				if (loresheet.values.includes(level)) {
					loresheet.values = loresheet.values.filter((e) => e !== level);
				} else {
					loresheet.values.push(level);
				}
			}

			return {
				...store,
				loresheet: loresheet
			};
		});

		const fixedLoresheetBackgrounds = checkForFixedBackgrounds(
			loresheet.name,
			level === 1 ? 'level1' : level === 2 ? 'level2' : 'level3'
		);

		if (fixedLoresheetBackgrounds.length > 0) {
			if ($characterCreationStore.loresheet?.values?.includes(level)) {
				fixedLoresheetBackgrounds.forEach((change) => {
					backgroundPaymentStore.addFixedBackground(
						backgroundName.parse(change.name),
						change.value,
						change.sphereOfInfluence,
						change.associatedAdvantages
					);
				});
			} else {
				fixedLoresheetBackgrounds.forEach((change) => {
					backgroundPaymentStore.removeFixedBackground(backgroundName.parse(change.name));
				});
			}
		}

		const dotBonusLoresheetBackgrounds = checkForDotBonusBackgrounds(
			loresheet.name,
			level === 1 ? 'level1' : level === 2 ? 'level2' : 'level3'
		);

		if (
			dotBonusLoresheetBackgrounds.length > 0 &&
			!$characterCreationStore.loresheet?.values?.includes(level)
		) {
			dotBonusLoresheetBackgrounds.forEach((change) => {
				if (Array.isArray(change.name)) {
					change.name.forEach((name) => {
						backgroundPaymentStore.removeLoresheetDotBackground(backgroundName.parse(name));
					});
				} else {
					backgroundPaymentStore.removeLoresheetDotBackground(backgroundName.parse(change.name));
				}
			});
		}

		const merits = checkForMerits(
			loresheet.name,
			level === 1 ? 'level1' : level === 2 ? 'level2' : 'level3'
		);

		if (merits.length > 0) {
			if ($characterCreationStore.loresheet?.values?.includes(level)) {
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

					backgroundPaymentStore.addLoresheetLevel(id, level);
				});
			} else {
				const meritsToRemove = backgroundPaymentStore.getLoreSheetLevel(level);
				meritsToRemove.forEach((change) => {
					characterCreationStore.update((store) => {
						store.merits = store.merits?.filter((e) => e.id !== change.id);

						return store;
					});
				});
				backgroundPaymentStore.removeLoresheetLevel(level);
			}
		} else {
			if ($characterCreationStore.loresheet?.values?.includes(level)) {
				backgroundPaymentStore.addLoresheetLevel(generateId(), level);
			} else {
				backgroundPaymentStore.removeLoresheetLevel(level);
			}
		}
	}

	function deletLoresheetBonusForLevel(level: 'level1' | 'level2' | 'level3') {
		const loresheet = $characterCreationStore.loresheet;
		if (!loresheet) return;

		const dotBonusLoresheetBackgrounds = checkForDotBonusBackgrounds(loresheet.name, level);
		dotBonusLoresheetBackgrounds.forEach((change) => {
			if (Array.isArray(change.name)) {
				change.name.forEach((name) => {
					backgroundPaymentStore.removeLoresheetDotBackground(backgroundName.parse(name));
				});
			} else {
				backgroundPaymentStore.removeLoresheetDotBackground(backgroundName.parse(change.name));
			}
		});

		const fixedLoresheetBackgrounds = checkForFixedBackgrounds(loresheet.name, level);

		fixedLoresheetBackgrounds.forEach((change) => {
			backgroundPaymentStore.removeFixedBackground(backgroundName.parse(change.name));
		});

		const meritsToRemove = get(backgroundPaymentStore.paymentStore).loresheet;
		meritsToRemove.forEach((change) => {
			characterCreationStore.update((store) => {
				store.merits = store.merits?.filter((e) => e.id !== change.id);

				return store;
			});
			backgroundPaymentStore.removeLoresheetLevel(change.value);
		});
	}

	function handleLoresheetChange(event: CustomEvent<{ name: LoresheetName | undefined }>) {
		const loresheet = $characterCreationStore.loresheet;

		if (loresheet) {
			deletLoresheetBonusForLevel('level1');
			deletLoresheetBonusForLevel('level2');
			deletLoresheetBonusForLevel('level3');

			loresheet.values?.forEach((value) => {
				backgroundPaymentStore.removeLoresheetLevel(value as 1 | 2 | 3);
			});
		}

		setLoresheet(event.detail.name);
	}
</script>

<svelte:window bind:innerWidth />

<EditableLoresheet
	editModeEnabled={true}
	selectedLoresheet={$characterCreationStore.loresheet}
	on:loresheetChange={(event) => handleLoresheetChange(event)}
	on:toggleLoreSheetLevel={(event) => toggleLoresheetLevel(event.detail.level)}
/>

<hr class="my-4" />

<div class="flex flex-col gap-2">
	<div class="flex flex-wrap gap-4">
		{#if $characterCreationStore.predatorType}
			<div class="flex flex-col">
				<HelpText id={$characterCreationStore.predatorType}>
					<h3 class="h3">Predator Type: {$characterCreationStore.predatorType}</h3>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{predatorTypeConfig[$characterCreationStore.predatorType].description}
						</p>

						<p class="whitespace-pre-line">
							{predatorTypeConfig[$characterCreationStore.predatorType].changeDescription}
						</p>
					</svelte:fragment>
				</HelpText>

				<ul class="list">
					{#each getBackgroundPredatorEntries() as pointsRecordEntry}
						{#if Array.isArray(pointsRecordEntry.name)}
							{#key $paymentStore.backgrounds.filter( (entry) => pointsRecordEntry.name?.includes(entry.name) )}
								<li>
									<span class="flex gap-1 whitespace-nowrap">
										{#each pointsRecordEntry.name as key, index}
											<HelpText id={key}>
												{key}{index !== pointsRecordEntry.name.length - 1 ? ' / ' : ': '}
												<svelte:fragment slot="helpText">
													<p class="whitespace-pre-line">
														{getDescription(key)}
													</p>
												</svelte:fragment>
											</HelpText>
										{/each}{backgroundPaymentStore.getPredatorPointsCombined(
											pointsRecordEntry.name,
											pointsRecordEntry.associatedAdvantage?.mayUseParentValue
										)} / {getPredatorConfigEntryByBackgroundNameArray(pointsRecordEntry.name)
											?.value}

										{#if pointsRecordEntry.associatedAdvantage}
											({pointsRecordEntry.associatedAdvantage.name ?? 'Variabel'} : {pointsRecordEntry
												.associatedAdvantage.mayUseParentValue
												? backgroundPaymentStore.getPredatorPointsCombined(
														pointsRecordEntry.name,
														true
													)
												: backgroundPaymentStore.getPredatorAdvantagePointsByBackgroundNameArray(
														pointsRecordEntry.name
													)} / {pointsRecordEntry.associatedAdvantage.mayUseParentValue
												? (getPredatorConfigEntryByBackgroundNameArray(pointsRecordEntry.name)
														?.value ?? 'Variabel')
												: pointsRecordEntry.associatedAdvantage.value})
										{/if}
									</span>
								</li>
							{/key}
						{:else if pointsRecordEntry.name}
							{#key $paymentStore.backgrounds.filter((entry) => entry.name === pointsRecordEntry.name)}
								<li>
									<span class="flex gap-2 whitespace-nowrap">
										<HelpText id={pointsRecordEntry.name}>
											{pointsRecordEntry.name}:
											<svelte:fragment slot="helpText">
												<p class="whitespace-pre-line">
													{getDescription(backgroundName.parse(pointsRecordEntry.name))}
												</p>
											</svelte:fragment>
										</HelpText>{backgroundPaymentStore.getPredatorPoints(
											backgroundName.parse(pointsRecordEntry.name)
										)} / {getPredatorConfigEntryByBackgroundName(
											backgroundName.parse(pointsRecordEntry.name)
										)?.value}
										{#if pointsRecordEntry.associatedAdvantage}
											{#if pointsRecordEntry.associatedAdvantage.name}
												<HelpText id={pointsRecordEntry.associatedAdvantage.name}>
													({pointsRecordEntry.associatedAdvantage.name}:
													<svelte:fragment slot="helpText">
														<p class="whitespace-pre-line">
															{getAssociatedAdvantageDescription(
																backgroundName.parse(pointsRecordEntry.name),
																backgroundAdvantageName.parse(
																	pointsRecordEntry.associatedAdvantage.name
																)
															)}
														</p>
													</svelte:fragment>
												</HelpText>
											{:else}
												Variabel:
											{/if}
											{pointsRecordEntry.associatedAdvantage.mayUseParentValue
												? backgroundPaymentStore.getPredatorPoints(
														backgroundName.parse(pointsRecordEntry.name)
													)
												: backgroundPaymentStore.getPredatorAdvantagePointsByBackgroundName(
														backgroundName.parse(pointsRecordEntry.name)
													)} / {pointsRecordEntry.associatedAdvantage.mayUseParentValue
												? getPredatorConfigEntryByBackgroundName(
														backgroundName.parse(pointsRecordEntry.name)
													)?.value
												: pointsRecordEntry.associatedAdvantage.value})
										{/if}
									</span>
								</li>
							{/key}
						{/if}
					{/each}
				</ul>
			</div>
		{/if}
		{#if $characterCreationStore.loresheet}
			{#if $characterCreationStore.predatorType && innerWidth > ScreenSize.SM}
				<span class="divider-vertical mx-0 h-auto" />
			{/if}
			<div class="flex flex-col">
				<HelpText id={$characterCreationStore.loresheet.name}>
					<h3 class="h3">Loresheet: {$characterCreationStore.loresheet.name}</h3>
					<svelte:fragment slot="helpText">
						{#if loresheetConfigEntry}
							{#if loresheetConfigEntry.prerequisite}
								<p class="whitespace-pre-line">
									<span class="font-bold">Prerequisite:</span>
									{loresheetConfigEntry.prerequisite}
								</p>
							{/if}

							<p class="whitespace-pre-line">
								{loresheetConfigEntry.description}
							</p>
						{/if}
					</svelte:fragment>
				</HelpText>

				{#key $characterCreationStore.loresheet?.values?.length}
					<ul class="list">
						{#key $characterCreationStore.loresheet.name}
							{#each getBackgroundLoresheetEntries($characterCreationStore.loresheet.name) as pointsRecordEntry}
								{#key $paymentStore.backgrounds.filter((entry) => entry.name === pointsRecordEntry.name)}
									{#if Array.isArray(pointsRecordEntry.name)}
										<li>
											<span class="flex gap-2 whitespace-nowrap">
												{#each pointsRecordEntry.name as key, index}
													<HelpText id={key}>
														{key}{index !== pointsRecordEntry.name.length - 1 ? ' / ' : ': '}
														<svelte:fragment slot="helpText">
															<p class="whitespace-pre-line">
																{getDescription(backgroundName.parse(key))}
															</p>
														</svelte:fragment>
													</HelpText>
												{/each}{backgroundPaymentStore.showLoresheetPointsTotalCombined(
													backgroundName.array().parse(pointsRecordEntry.name)
												)} / {getLoresheetConfigEntryByBackgroundNameArray(
													backgroundName.array().parse(pointsRecordEntry.name)
												)?.value}
											</span>
										</li>
									{:else if pointsRecordEntry.name}
										{#key $paymentStore.backgrounds.filter((entry) => entry.name === pointsRecordEntry.name)}
											<li>
												<span class="flex gap-2 whitespace-nowrap">
													<HelpText id={pointsRecordEntry.name}>
														{pointsRecordEntry.name}:
														<svelte:fragment slot="helpText">
															<p class="whitespace-pre-line">
																{getDescription(backgroundName.parse(pointsRecordEntry.name))}
															</p>
														</svelte:fragment>
													</HelpText>{backgroundPaymentStore.showLoresheetPointsTotal(
														backgroundName.parse(pointsRecordEntry.name)
													)} / {getLoresheetConfigEntryByBackgroundName(
														backgroundName.parse(pointsRecordEntry.name)
													)?.value}
												</span>
											</li>
										{/key}
									{/if}
								{/key}
							{/each}
						{/key}
					</ul>
				{/key}
			</div>
		{/if}
		{#if $characterCreationStore.backgrounds.find((bg) => bg.name === 'Haven' && bg.value >= 2)}
			{#if ($characterCreationStore.predatorType || $characterCreationStore.loresheet) && innerWidth > ScreenSize.SM}
				<span class="divider-vertical mx-0 h-auto" />
			{/if}
			<div class="flex flex-col">
				<h3 class="h3">Haven-Advantages</h3>
				<ul class="list">
					<li>
						<span>
							Free Dots: {backgroundPaymentStore.getHavenFreebiesUsed()} / {$maxHavenFreebiePoints}
						</span>
					</li>
				</ul>
			</div>
		{/if}
		{#if ($characterCreationStore.predatorType || $characterCreationStore.loresheet?.name || $characterCreationStore.backgrounds.find((bg) => bg.name === 'Haven' && bg.value >= 2)) && innerWidth > ScreenSize.SM}
			<span class="divider-vertical mx-0 h-auto" />
		{/if}
		<div class="flex flex-col">
			<h3 class="h3">Standard</h3>
			<ul class="list">
				<li>
					<span>
						Free Dots: {$usedFreebiePoints} / {$maxFreebiePoints}
					</span>
				</li>
			</ul>
		</div>
	</div>

	<hr class="my-4" />

	<div class="flex flex-col gap-2">
		<label>
			Backgrounds
			<select class="select rounded-lg" bind:value={selectedBackground}>
				<option disabled selected value="">Select a Background</option>
				{#each backgroundName.options as background}
					<option value={background}>{background}</option>
				{/each}
			</select>
		</label>
		{#key $usedFreebiePoints}
			<button
				class="variant-filled-primary btn rounded-lg"
				disabled={($characterCreationStore.backgrounds.some((e) => selectedBackground === e.name) &&
					canOnlyBeBoughtOnce.includes(selectedBackground)) ||
					!backgroundName.options.includes(selectedBackground) ||
					!backgroundPaymentStore.canAddBackground(selectedBackground)}
				type="button"
				on:click={() => addBackground(selectedBackground, canOnlyBeBoughtOnce, true)}
			>
				Add Background
			</button>
		{/key}
	</div>

	<hr />

	<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
		{#each $characterCreationStore.backgrounds as background, index}
			<EditableBackground
				{background}
				editModeEnabled={true}
				editModeEnabledAdvantages={true}
				editModeEnabledDisadvantages={true}
				on:change={handleChange}
				on:deleteClick={handleDeleteClick}
				on:advantageClick={handleBackgroundAdvantageClick}
				on:disadvantageClick={handleBackgroundDisadvantageClick}
				on:advantageDeleteClick={handleBackgroundAdvantageDeleteClick}
				on:disadvantageDeleteClick={handleBackgroundDisadvantageDeleteClick}
			/>

			{#if ((index + 1) % 3 === 0 && index + 1 !== $characterCreationStore.backgrounds.length) || (innerWidth < ScreenSize.SM && index + 1 !== $characterCreationStore.backgrounds.length)}
				<div class="col-span-full my-2 h-px bg-gray-300"></div>
			{/if}
		{/each}
	</div>
</div>
