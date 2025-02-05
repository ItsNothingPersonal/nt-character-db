<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { generateId } from '$lib/util';
	import { type DisciplinePower } from '$lib/zod/lotn/disciplines/disciplinePower';
	import { disciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import {
		proteanShapechangeOption,
		type ProteanShapechangeOption
	} from '$lib/zod/lotn/enums/proteanShapechangeOption';
	import { playerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline';
	import {
		ritualDisciplinePowerUnion,
		type NormalDisciplinePowerUnion,
		type NormalDisciplines,
		type RitualDisciplinePowerUnion,
		type RitualDisciplines
	} from '$lib/zod/lotn/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import {
		getDisciplineForDisciplinePower,
		getDisciplinePower,
		getDisciplinePowerConfigsForDiscipline,
		getFormulaLevel
	} from '../util/disciplines';
	import { joinWithOr } from '../util/generalUtils';

	export let dot: number;

	export let selectedDiscipline: NormalDisciplines | RitualDisciplines;
	export let selectedDisciplinePowerId: string | undefined;
	export let selectedDisciplinePower:
		| NormalDisciplinePowerUnion
		| RitualDisciplinePowerUnion
		| undefined;
	export let disableDisciplinePowerSelection: boolean = false;
	export let showDeleteButton: boolean = false;
	export let editModeEnabled: boolean = false;
	export let attachFormulaMode: 'Discipline' | 'AdditionalFormulas' = 'Discipline';
	export let maxDisciplineLevelToShow = dot;
	export let counterfeitDisciplinePower: NormalDisciplinePowerUnion | undefined = undefined;
	export let selectedProteanShapechangeOption: ProteanShapechangeOption | undefined = undefined;
	export let description: string | undefined = undefined;

	$: counterfeitPowerConfig =
		counterfeitDiscipline && counterfeitDisciplinePower
			? getDisciplinePower(counterfeitDiscipline, counterfeitDisciplinePower)
			: undefined;
	$: disciplinePowerConfig = selectedDisciplinePower
		? getDisciplinePower(selectedDiscipline, selectedDisciplinePower)
		: undefined;
	$: counterfeitLevel = ritualDisciplinePowerUnion.safeParse(selectedDisciplinePower).success
		? getFormulaLevel(ritualDisciplinePowerUnion.parse(selectedDisciplinePower))
		: 0;

	onMount(() => {
		counterfeitDiscipline = counterfeitDisciplinePower
			? getDisciplineForDisciplinePower(counterfeitDisciplinePower)
			: undefined;

		previousDisciplinePower = selectedDisciplinePower;
		previousDisciplinePowerId = selectedDisciplinePowerId;
	});

	let previousDisciplinePower: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
	let previousDisciplinePowerId: string | undefined;
	let counterfeitDiscipline: NormalDisciplines | undefined = undefined;
	//let previousCounterfeitDiscipline: NormalDisciplines | undefined = undefined;

	let previousCounterfeitPower: NormalDisciplinePowerUnion | undefined = undefined;

	const dispatchChange = createEventDispatcher<{
		disciplinePowerChange: {
			name: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
		};
		newFormula: {
			id: string;
			name: RitualDisciplinePowerUnion;
			level: number;
		};
		removeFormula: {
			id: string;
		};
	}>();

	function addDisciplinePower(
		discipline: NormalDisciplines | RitualDisciplines,
		powerId: string,
		power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion,
		previousPower: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined,
		previousPowerId: string | undefined,
		attachFormulaMode: 'Discipline' | 'AdditionalFormulas' = 'Discipline'
	) {
		characterCreationStore.update((store) => {
			if (attachFormulaMode === 'Discipline') {
				let entryToEdit = store.disciplines.find((e) => e.name === discipline) as {
					name: string;
					powers: DisciplinePower[];
				};
				if (!entryToEdit) return store;

				if (previousPower) {
					const oldIndex = entryToEdit.powers.findIndex((e) => e.id === previousPowerId);
					entryToEdit.powers[oldIndex].name = power;
					entryToEdit.powers[oldIndex].thinBloodCounterfeitDisciplinePower = undefined;
					entryToEdit.powers[oldIndex].proteanShapechangeOption = undefined;
				} else {
					entryToEdit.powers.push({ id: powerId, name: power });
				}

				if (!entryToEdit) {
					return store;
				}

				const index = store.disciplines.findIndex((e) => e.name === discipline);
				store.disciplines[index] = playerDiscipline.parse(entryToEdit);
			} else {
				if (!store.formulas) {
					store.formulas = [];
				}

				let entryToEdit = store.formulas.find((e) => e.id === powerId);

				if (entryToEdit) {
					entryToEdit.formula = ritualDisciplinePowerUnion.parse(power);
					entryToEdit.counterfeitPower = undefined;
					entryToEdit.proteanShapechangeOption = undefined;
				} else {
					store.formulas.push({
						id: powerId,
						formula: ritualDisciplinePowerUnion.parse(power)
					});
				}
			}
			return store;
		});
	}

	function deleteDisciplinePower(
		params:
			| {
					discipline: NormalDisciplines | RitualDisciplines;
					powerId: string;
					attachFormulaMode: 'Discipline';
			  }
			| {
					powerId: string;
					attachFormulaMode: 'AdditionalFormulas';
			  }
	) {
		characterCreationStore.update((store) => {
			if (params.attachFormulaMode === 'Discipline') {
				const { discipline, powerId } = params;

				let entryToEdit = store.disciplines.find((e) => e.name === discipline);
				if (!entryToEdit) return store;

				const index = store.disciplines.findIndex((e) => e.name === discipline);
				const indexPower = entryToEdit.powers.findIndex((e) => e.id === powerId);

				entryToEdit.powers.splice(indexPower, 1);
				store.disciplines[index] = entryToEdit;
			} else if (params.attachFormulaMode === 'AdditionalFormulas') {
				store.formulas = store.formulas?.filter((e) => e.id !== params.powerId);

				if (store.formulas?.length === 0) {
					store.formulas = undefined;
				}
			}

			return store;
		});
	}

	function getDisciplinePowers(
		discipline: NormalDisciplines | RitualDisciplines,
		maxLevel: number
	) {
		return getDisciplinePowerConfigsForDiscipline(discipline)
			.filter((power) => (power.data ? power.data.level <= maxLevel : false))
			.filter((power) => {
				if (power.amalgam) {
					const discipline = power.amalgam.name;

					if (
						!$characterCreationStore.disciplines.some(
							(e) => power.amalgam && e.name === discipline && e.value >= power.amalgam.value
						)
					) {
						return false;
					} else if (
						$characterCreationStore.disciplines.some(
							(d) => d.name === discipline && d.powers.some((p) => p.name === power.name)
						)
					) {
						return false;
					}
				}
				return true;
			})
			.filter((power) => {
				if ($characterCreationStore.ghoul) {
					return (power.data?.level ?? 0) <= 1;
				} else {
					return true;
				}
			});
	}

	function addCounterfeitPower(
		params:
			| {
					counterfeitPower: NormalDisciplinePowerUnion;
					powerId: string;
					attachFormulaMode: 'Discipline';
					proteanShapechangeOption?: ProteanShapechangeOption;
			  }
			| {
					counterfeitPower: NormalDisciplinePowerUnion;
					powerId: string;
					attachFormulaMode: 'AdditionalFormulas';
					formula: RitualDisciplinePowerUnion;
					proteanShapechangeOption?: ProteanShapechangeOption;
			  }
	) {
		characterCreationStore.update((store) => {
			if (params.attachFormulaMode === 'Discipline') {
				const { counterfeitPower, powerId, proteanShapechangeOption } = params;
				let entryToEdit = store.disciplines.find((e) => e.name === 'Thin-Blood Alchemy');
				if (!entryToEdit) return store;

				if (
					entryToEdit.powers.some((e) => e.thinBloodCounterfeitDisciplinePower === counterfeitPower)
				) {
					return store;
				}

				if (!powerId) {
					return store;
				}

				const oldIndex = entryToEdit.powers.findIndex((e) => e.id === powerId);
				entryToEdit.powers[oldIndex].thinBloodCounterfeitDisciplinePower = counterfeitPower;
				entryToEdit.powers[oldIndex].proteanShapechangeOption = proteanShapechangeOption;

				const index = store.disciplines.findIndex((e) => e.name === 'Thin-Blood Alchemy');
				store.disciplines[index] = playerDiscipline.parse(entryToEdit);
			} else {
				const { counterfeitPower, powerId, formula, proteanShapechangeOption } = params;

				if (!store.formulas) {
					store.formulas = [];
				}

				let entryToEdit = store.formulas.find((e) => e.id === powerId);

				if (entryToEdit) {
					entryToEdit.counterfeitPower = counterfeitPower;
				} else {
					store.formulas.push({
						id: generateId(),
						counterfeitPower,
						formula,
						proteanShapechangeOption
					});
				}
			}
			return store;
		});
	}

	function addProteanShapechangeOption(
		option: ProteanShapechangeOption,
		powerId: string,
		attachFormulaMode: 'Discipline' | 'AdditionalFormulas' = 'Discipline'
	) {
		characterCreationStore.update((store) => {
			if (attachFormulaMode === 'Discipline') {
				const entryToEdit = store.disciplines.find(
					(e) => e.name === 'Protean' || e.name === 'Thin-Blood Alchemy'
				);
				if (!entryToEdit) return store;

				const indexPower = entryToEdit.powers.findIndex((e) => e.id === powerId);
				if (indexPower === -1) return store;

				entryToEdit.powers[indexPower].proteanShapechangeOption = option;
			} else if (attachFormulaMode === 'AdditionalFormulas') {
				const entryToEdit = store.formulas?.find((e) => e.id === powerId);
				if (!entryToEdit) return store;

				entryToEdit.proteanShapechangeOption = option;
			}
			return store;
		});
	}

	function addDescription(
		discipline: NormalDisciplines | RitualDisciplines,
		powerId: string,
		description: string | undefined,
		attachFormulaMode: 'Discipline' | 'AdditionalFormulas' = 'Discipline'
	) {
		characterCreationStore.update((store) => {
			if (attachFormulaMode === 'Discipline') {
				const entryToEdit = store.disciplines.find((e) => e.name === discipline);
				if (!entryToEdit) return store;

				const indexPower = entryToEdit.powers.findIndex((e) => e.id === powerId);
				if (indexPower === -1) return store;

				if (description) {
					entryToEdit.powers[indexPower].description = description;
				} else {
					entryToEdit.powers[indexPower].description = undefined;
				}
			} else if (attachFormulaMode === 'AdditionalFormulas') {
				const entryToEdit = store.formulas?.find((e) => e.id === powerId);
				if (!entryToEdit) return store;

				if (description) {
					entryToEdit.description = description;
				} else {
					entryToEdit.description = undefined;
				}
			}
			return store;
		});
	}

	function hasDescription() {
		let result = false;
		if (selectedDisciplinePower?.match('Counterfeit') && counterfeitDisciplinePower) {
			const disciplineFaked = getDisciplineForDisciplinePower(counterfeitDisciplinePower);
			if (disciplineFaked) {
				const config = getDisciplinePower(disciplineFaked, counterfeitDisciplinePower);
				result = config?.hasDescription ?? false;
			}
		} else if (disciplinePowerConfig) {
			result = disciplinePowerConfig.hasDescription ?? false;
		}
		return result;
	}
</script>

{#if editModeEnabled}
	<label class="label">
		<span>Power {dot}</span>
		<select
			class="select rounded-lg"
			disabled={disableDisciplinePowerSelection}
			bind:value={selectedDisciplinePower}
			on:change={() => {
				if (selectedDiscipline && selectedDisciplinePower) {
					if (selectedDisciplinePowerId === undefined) {
						selectedDisciplinePowerId = generateId();
					}
					if (attachFormulaMode === 'Discipline') {
						addDisciplinePower(
							selectedDiscipline,
							selectedDisciplinePowerId,
							selectedDisciplinePower,
							previousDisciplinePower,
							previousDisciplinePowerId,
							attachFormulaMode
						);
					} else {
						addDisciplinePower(
							selectedDiscipline,
							selectedDisciplinePowerId,
							selectedDisciplinePower,
							previousDisciplinePower,
							previousDisciplinePowerId,
							attachFormulaMode
						);

						dispatchChange('newFormula', {
							id: selectedDisciplinePowerId,
							name: ritualDisciplinePowerUnion.parse(selectedDisciplinePower),
							level: counterfeitLevel
						});
					}

					previousDisciplinePower = selectedDisciplinePower;
					previousDisciplinePowerId = selectedDisciplinePowerId;

					dispatchChange('disciplinePowerChange', { name: selectedDisciplinePower });
				}
			}}
		>
			<option disabled selected value={undefined}>
				Please select a power for that discipline
			</option>

			{#each getDisciplinePowers(selectedDiscipline, maxDisciplineLevelToShow) as disciplinePower}
				{#if disciplinePower.data?.level}
					<option
						selected={selectedDisciplinePower === disciplinePower.name}
						value={disciplinePower.name}
					>
						{disciplinePower.name} (Level: {disciplinePower.data?.level})
					</option>
				{:else}
					<option
						selected={selectedDisciplinePower === disciplinePower.name}
						value={disciplinePower.name}
					>
						{disciplinePower.name}
					</option>
				{/if}
			{/each}
		</select>

		{#if disciplinePowerConfig && selectedDisciplinePower && selectedDisciplinePowerId}
			<div class="flex">
				<HelpText id={selectedDisciplinePowerId}>
					<p class="underline decoration-dotted">Power-Description</p>
					<svelte:fragment slot="helpText">
						{#if disciplinePowerConfig.amalgam}
							<p class="whitespace-pre-line">
								<span class="font-bold">Amalgam:</span>
								{disciplinePowerConfig.amalgam.name}
								{disciplinePowerConfig.amalgam.value}
							</p>
						{/if}
						{#if disciplinePowerConfig.challengePool}
							<p class="whitespace-pre-line">
								<span class="font-bold">Challenge Pool:</span>
								{#if typeof disciplinePowerConfig.challengePool.defender === 'string'}
									{disciplinePowerConfig.challengePool.attacker.attribute} + {disciplinePowerConfig
										.challengePool.attacker.skill} vs {disciplinePowerConfig.challengePool.defender}
								{:else if 'skillOrAttribute' in disciplinePowerConfig.challengePool}
									{disciplinePowerConfig.challengePool.attacker.attribute} + {disciplinePowerConfig
										.challengePool.attacker.skill} vs {`${disciplinePowerConfig.challengePool.defender.attribute} + ${disciplinePowerConfig.challengePool.skillOrAttribute}`}
								{/if}

								{#if disciplinePowerConfig.challengePool.hint}
									{disciplinePowerConfig.challengePool.hint}
								{/if}
							</p>
						{/if}
						<p class="whitespace-pre-line">
							<span class="font-bold">Cost:</span>
							{disciplinePowerConfig.cost}
						</p>
						{#if disciplinePowerConfig && 'prerequisite' in disciplinePowerConfig}
							<p class="whitespace-pre-line">
								<span class="font-bold">Prerequisite:</span>
								{#if Array.isArray(disciplinePowerConfig.prerequisite)}
									{joinWithOr(disciplinePowerConfig.prerequisite)}
								{:else if typeof disciplinePowerConfig.prerequisite !== 'string' && disciplinePowerConfig.prerequisite?.main && disciplinePowerConfig.prerequisite.or}
									{disciplinePowerConfig.prerequisite.main} and either {joinWithOr(
										disciplinePowerConfig.prerequisite.or
									)}
								{:else}
									{disciplinePowerConfig.prerequisite}
								{/if}
							</p>
						{/if}
						<p class="whitespace-pre-line">
							{disciplinePowerConfig.system}
						</p>
						<p class="whitespace-pre-line">
							<span class="font-bold">Duration:</span>
							{disciplinePowerConfig.duration}
						</p>
					</svelte:fragment>
				</HelpText>
				{#if showDeleteButton}
					<button
						class="variant-filled-primary btn ml-auto w-3 rounded-lg"
						type="button"
						on:click={() => {
							if (attachFormulaMode === 'Discipline') {
								if (selectedDisciplinePowerId && selectedDisciplinePower) {
									deleteDisciplinePower({
										discipline: selectedDiscipline,
										powerId: selectedDisciplinePowerId,
										attachFormulaMode
									});

									dispatchChange('disciplinePowerChange', { name: selectedDisciplinePower });

									selectedDisciplinePower = undefined;
									previousDisciplinePower = undefined;
									previousDisciplinePowerId = undefined;
								}
							} else {
								if (selectedDisciplinePower && selectedDisciplinePowerId) {
									deleteDisciplinePower({
										powerId: selectedDisciplinePowerId,
										attachFormulaMode
									});

									dispatchChange('removeFormula', {
										id: selectedDisciplinePowerId
									});

									selectedDisciplinePower = undefined;
									previousDisciplinePower = undefined;
									previousDisciplinePowerId = undefined;
								}
							}
						}}
					>
						<iconify-icon height="12" icon="mdi:remove" />
					</button>
				{/if}
			</div>
			{#if selectedDisciplinePower.match('Counterfeit')}
				<select
					class="select rounded-lg"
					bind:value={counterfeitDiscipline}
					on:change={() => {
						if (attachFormulaMode === 'Discipline') {
							if (
								previousCounterfeitPower &&
								selectedDisciplinePower &&
								selectedDisciplinePowerId
							) {
								deleteDisciplinePower({
									discipline: selectedDiscipline,
									powerId: selectedDisciplinePowerId,
									attachFormulaMode
								});
							}
						} else {
							if (
								selectedDisciplinePower &&
								selectedDisciplinePowerId &&
								counterfeitDisciplinePower
							) {
								deleteDisciplinePower({
									powerId: selectedDisciplinePowerId,
									attachFormulaMode
								});
							}
						}

						previousCounterfeitPower = undefined;
						counterfeitDisciplinePower = undefined;
						selectedProteanShapechangeOption = undefined;
					}}
				>
					<option disabled selected value={undefined}>
						Which discipline do you want to copy?
					</option>

					{#each disciplineName.options.filter((e) => e !== 'Thin-Blood Alchemy') as discipline}
						<option selected={counterfeitDiscipline === discipline} value={discipline}>
							{discipline}
						</option>
					{/each}
				</select>

				{#if counterfeitDiscipline}
					<select
						class="select rounded-lg"
						bind:value={counterfeitDisciplinePower}
						on:change={() => {
							if (
								counterfeitDisciplinePower &&
								selectedDisciplinePower &&
								selectedDisciplinePower &&
								selectedDisciplinePowerId
							) {
								if (attachFormulaMode === 'Discipline') {
									addCounterfeitPower({
										counterfeitPower: counterfeitDisciplinePower,
										powerId: selectedDisciplinePowerId,
										attachFormulaMode
									});
								} else {
									addCounterfeitPower({
										counterfeitPower: counterfeitDisciplinePower,
										powerId: selectedDisciplinePowerId,
										attachFormulaMode,
										formula: ritualDisciplinePowerUnion.parse(selectedDisciplinePower)
									});
								}

								previousCounterfeitPower = counterfeitDisciplinePower;
								selectedProteanShapechangeOption = undefined;
							}
						}}
					>
						<option disabled selected value={undefined}> Which power do you want to copy? </option>

						{#each getDisciplinePowerConfigsForDiscipline(counterfeitDiscipline)
							.filter((d) => (d.data?.level ? d.data.level === counterfeitLevel - 1 : false))
							.filter((d) => !d.amalgam) as power}
							<option selected={counterfeitDisciplinePower === power.name} value={power.name}>
								{power.name} (Level: {power.data?.level})
							</option>
						{/each}
					</select>

					{#if counterfeitDisciplinePower && counterfeitPowerConfig}
						<HelpText id={counterfeitDisciplinePower}>
							<p class="underline decoration-dotted">Power-Description</p>
							<svelte:fragment slot="helpText">
								{#if counterfeitPowerConfig.amalgam}
									<p class="whitespace-pre-line">
										<span class="font-bold">Amalgam:</span>
										{counterfeitPowerConfig.amalgam.name}
										{counterfeitPowerConfig.amalgam.value}
									</p>
								{/if}
								{#if counterfeitPowerConfig.challengePool}
									<p class="whitespace-pre-line">
										<span class="font-bold">Challenge Pool:</span>
										{#if typeof counterfeitPowerConfig.challengePool.defender === 'string'}
											{counterfeitPowerConfig.challengePool.attacker.attribute} + {counterfeitPowerConfig
												.challengePool.attacker.skill} vs {counterfeitPowerConfig.challengePool
												.defender}
										{:else if 'skillOrAttribute' in counterfeitPowerConfig.challengePool}
											{counterfeitPowerConfig.challengePool.attacker.attribute} + {counterfeitPowerConfig
												.challengePool.attacker.skill} vs {`${counterfeitPowerConfig.challengePool.defender.attribute} + ${counterfeitPowerConfig.challengePool.skillOrAttribute}`}
										{/if}

										{#if counterfeitPowerConfig.challengePool.hint}
											{counterfeitPowerConfig.challengePool.hint}
										{/if}
									</p>
								{/if}
								<p class="whitespace-pre-line">
									<span class="font-bold">Cost:</span>
									{counterfeitPowerConfig.cost}
								</p>
								{#if 'prerequisite' in counterfeitPowerConfig}
									<p class="whitespace-pre-line">
										<span class="font-bold">Prerequisite:</span>
										{#if Array.isArray(counterfeitPowerConfig.prerequisite)}
											{joinWithOr(counterfeitPowerConfig.prerequisite)}
										{:else if typeof counterfeitPowerConfig.prerequisite !== 'string' && counterfeitPowerConfig.prerequisite?.main && counterfeitPowerConfig.prerequisite.or}
											{counterfeitPowerConfig.prerequisite.main} and either {joinWithOr(
												counterfeitPowerConfig.prerequisite.or
											)}
										{:else}
											{counterfeitPowerConfig.prerequisite}
										{/if}
									</p>
								{/if}
								<p class="whitespace-pre-line">
									{counterfeitPowerConfig.system}
								</p>
								<p class="whitespace-pre-line">
									<span class="font-bold">Duration:</span>
									{counterfeitPowerConfig.duration}
								</p>
							</svelte:fragment>
						</HelpText>
					{/if}
				{/if}
			{/if}
			{#if selectedDisciplinePower === 'Shapechange' || counterfeitDisciplinePower === 'Shapechange'}
				<select
					class="select rounded-lg"
					bind:value={selectedProteanShapechangeOption}
					on:change={() => {
						if (selectedProteanShapechangeOption && selectedDisciplinePowerId) {
							addProteanShapechangeOption(
								selectedProteanShapechangeOption,
								selectedDisciplinePowerId,
								attachFormulaMode
							);
						}
					}}
				>
					<option disabled selected value={undefined}>
						Which shapechange option do you want?
					</option>

					{#each proteanShapechangeOption.options as shapechangeoption}
						<option
							selected={selectedProteanShapechangeOption === shapechangeoption}
							value={shapechangeoption}
						>
							{shapechangeoption}
						</option>
					{/each}
				</select>
			{/if}
			{#if hasDescription()}
				<label for="description">
					<span class="text-sm">Beschreibung</span>
					<input
						id="description"
						class="input variant-form-material"
						maxlength={50}
						bind:value={description}
						on:change={() => {
							if (selectedDisciplinePowerId) {
								addDescription(
									selectedDiscipline,
									selectedDisciplinePowerId,
									description,
									attachFormulaMode
								);
							}
						}}
					/>
				</label>
			{/if}
		{/if}
	</label>
{:else if selectedDisciplinePower && disciplinePowerConfig && selectedDisciplinePowerId}
	<HelpText id={selectedDisciplinePowerId}>
		<div class={`flex flex-col space-y-0 bg-surface-800`}>
			<span id={selectedDisciplinePowerId}>
				{selectedDisciplinePower} (Level: {disciplinePowerConfig.level})
			</span>

			{#if counterfeitDisciplinePower && selectedProteanShapechangeOption}
				<div class="flex gap-2">
					<span class="text-sm leading-snug"> {counterfeitDisciplinePower} </span>
					<span class="text-sm leading-snug"> (Benefit: {selectedProteanShapechangeOption}) </span>
				</div>
			{:else if counterfeitDisciplinePower}
				<span class="text-sm leading-snug"> {counterfeitDisciplinePower} </span>
			{:else if selectedProteanShapechangeOption}
				<span class="text-sm leading-snug"> Benefit: {selectedProteanShapechangeOption} </span>
			{/if}
			{#if description}
				<span class="text-sm leading-snug">{description}</span>
			{/if}
		</div>
		<svelte:fragment slot="helpText">
			{#if counterfeitPowerConfig?.amalgam}
				<p class="whitespace-pre-line">
					<span class="font-bold">Amalgam:</span>
					{counterfeitPowerConfig.amalgam.name}
					{counterfeitPowerConfig.amalgam.value}
				</p>
			{:else if disciplinePowerConfig.amalgam}
				<p class="whitespace-pre-line">
					<span class="font-bold">Amalgam:</span>
					{disciplinePowerConfig.amalgam.name}
					{disciplinePowerConfig.amalgam.value}
				</p>
			{/if}
			{#if counterfeitPowerConfig?.challengePool}
				<p class="whitespace-pre-line">
					<span class="font-bold">Challenge Pool:</span>
					{#if typeof counterfeitPowerConfig.challengePool.defender === 'string'}
						{counterfeitPowerConfig.challengePool.attacker.attribute} + {counterfeitPowerConfig
							.challengePool.attacker.skill} vs {counterfeitPowerConfig.challengePool.defender}
					{:else}
						{counterfeitPowerConfig.challengePool.attacker.attribute} + {counterfeitPowerConfig
							.challengePool.attacker.skill} vs {`${counterfeitPowerConfig.challengePool.defender.attribute} + ${counterfeitPowerConfig.challengePool.defender.skillOrAttribute}`}
					{/if}

					{#if counterfeitPowerConfig.challengePool.hint}
						{counterfeitPowerConfig.challengePool.hint}
					{/if}
				</p>
			{:else if disciplinePowerConfig.challengePool}
				<p class="whitespace-pre-line">
					<span class="font-bold">Challenge Pool:</span>
					{#if typeof disciplinePowerConfig.challengePool.defender === 'string'}
						{disciplinePowerConfig.challengePool.attacker.attribute} + {disciplinePowerConfig
							.challengePool.attacker.skill} vs {disciplinePowerConfig.challengePool.defender}
					{:else}
						{disciplinePowerConfig.challengePool.attacker.attribute} + {disciplinePowerConfig
							.challengePool.attacker.skill} vs {`${disciplinePowerConfig.challengePool.defender.attribute} + ${disciplinePowerConfig.challengePool.defender.skillOrAttribute}`}
					{/if}

					{#if disciplinePowerConfig.challengePool.hint}
						{disciplinePowerConfig.challengePool.hint}
					{/if}
				</p>
			{/if}
			<p class="whitespace-pre-line">
				<span class="font-bold">Cost:</span>
				{#if counterfeitPowerConfig}
					{counterfeitPowerConfig.cost}
				{:else}
					{disciplinePowerConfig.cost}
				{/if}
			</p>
			{#if counterfeitPowerConfig && 'prerequisite' in counterfeitPowerConfig && counterfeitPowerConfig.prerequisite}
				<p class="whitespace-pre-line">
					<span class="font-bold">Prerequisite:</span>
					{#if Array.isArray(counterfeitPowerConfig.prerequisite)}
						{joinWithOr(counterfeitPowerConfig.prerequisite)}
					{:else if typeof counterfeitPowerConfig.prerequisite !== 'string'}
						{counterfeitPowerConfig.prerequisite.main} and either {joinWithOr(
							counterfeitPowerConfig.prerequisite.or
						)}
					{:else}
						{counterfeitPowerConfig.prerequisite}
					{/if}
				</p>
			{:else if 'prerequisite' in disciplinePowerConfig && disciplinePowerConfig.prerequisite}
				<p class="whitespace-pre-line">
					<span class="font-bold">Prerequisite:</span>
					{#if Array.isArray(disciplinePowerConfig.prerequisite)}
						{joinWithOr(disciplinePowerConfig.prerequisite)}
					{:else if typeof disciplinePowerConfig.prerequisite !== 'string'}
						{disciplinePowerConfig.prerequisite.main} and either {joinWithOr(
							disciplinePowerConfig.prerequisite.or
						)}
					{:else}
						{disciplinePowerConfig.prerequisite}
					{/if}
				</p>
			{/if}
			<p class="whitespace-pre-line">
				<span class="font-bold">System:</span>
				{#if counterfeitPowerConfig}
					{counterfeitPowerConfig.system}
				{:else}
					{disciplinePowerConfig.system}
				{/if}
			</p>
			<p class="whitespace-pre-line">
				<span class="font-bold">Duration:</span>
				{#if counterfeitPowerConfig}
					{counterfeitPowerConfig.duration}
				{:else}
					{disciplinePowerConfig.duration}
				{/if}
			</p>
		</svelte:fragment>
	</HelpText>
{:else}
	<p>
		{selectedDisciplinePower}
	</p>
	<p>
		{JSON.stringify({ disciplinePowerConfig })}
	</p>
{/if}
