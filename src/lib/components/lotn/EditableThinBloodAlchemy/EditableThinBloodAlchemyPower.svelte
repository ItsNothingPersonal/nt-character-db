<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { generateId } from '$lib/util';
	import { disciplineName, type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import {
		type NormalDisciplinePowerUnion,
		type NormalDisciplines,
		type RitualDisciplinePowerUnion,
		type RitualDisciplines
	} from '$lib/zod/lotn/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import {
		getDisciplineForDisciplinePower,
		getDisciplinePowerConfigForPowerName,
		getDisciplinePowerConfigsForDiscipline,
		removeFormula
	} from '../util/disciplines';
	import { joinWithOr } from '../util/generalUtils';

	export let dot: number;
	export let levelThinBloodAlchemy: number;

	export let selectedDiscipline: RitualDisciplines;
	export let selectedDisciplinePower: RitualDisciplinePowerUnion | undefined;
	export let disableDisciplinePowerSelection: boolean = false;
	export let showDeleteButton: boolean = false;
	export let counterfeitDiscipline: DisciplineName | undefined = undefined;
	export let counterfeitPower: NormalDisciplinePowerUnion | undefined = undefined;
	export let attachFormulaMode: 'Discipline' | 'AdditionalFormulas' = 'Discipline';

	let previousDisciplinePower: RitualDisciplinePowerUnion | undefined;
	let previousCounterfeitPower: NormalDisciplinePowerUnion | undefined = undefined;
	export let counterfeitPowerId: string | undefined;

	onMount(() => {
		previousCounterfeitPower = counterfeitPower;
		if (counterfeitPower) {
			counterfeitDiscipline = getDisciplineForDisciplinePower(counterfeitPower);
		}
		previousDisciplinePower = selectedDisciplinePower;
	});

	$: disciplinePowerConfig = getDisciplinePowerConfigsForDiscipline(selectedDiscipline).find(
		(e) => e.name === selectedDisciplinePower
	);

	$: counterfeitLevel = getCounterFeitLevel(selectedDisciplinePower);
	$: counterfeitPowerConfig = counterfeitDiscipline
		? getDisciplinePowerConfigsForDiscipline(counterfeitDiscipline).find(
				(e) => e.name === counterfeitPower
			)
		: undefined;

	function getCounterFeitLevel(disciplinePower: RitualDisciplinePowerUnion | undefined) {
		if (!disciplinePower) return 0;

		const match = disciplinePower?.match(/Counterfeit(?: Power)? \(Level (\d+)\)/);
		return match ? parseInt(match[1], 10) : 0;
	}

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
			name: RitualDisciplinePowerUnion;
		};
	}>();

	function addDisciplinePower(
		discipline: RitualDisciplines,
		power: RitualDisciplinePowerUnion,
		previousPower: RitualDisciplinePowerUnion | undefined
	) {
		characterCreationStore.update((store) => {
			let entryToEdit = store.disciplines.find((e) => e.name === discipline);
			if (!entryToEdit) return store;
			if (entryToEdit.powers.some((e) => e === power) && !power.match('Counterfeit')) {
				selectedDisciplinePower = previousPower;
				return store;
			}

			if (previousPower) {
				const oldIndex = entryToEdit.powers.findIndex((e) => e === previousPower);
				entryToEdit.powers[oldIndex] = power;
			} else {
				addValue(entryToEdit.powers, power);
			}

			if (!entryToEdit) {
				return store;
			}

			const index = store.disciplines.findIndex((e) => e.name === discipline);
			store.disciplines[index] = entryToEdit;

			return store;
		});
	}

	function addFormula(
		formula: RitualDisciplinePowerUnion,
		counterfeitPower: NormalDisciplinePowerUnion | undefined
	) {
		const id = generateId();
		characterCreationStore.update((store) => {
			if (!store.formulas) {
				store.formulas = [];
			}

			store.formulas = [...store.formulas, { id, formula, counterfeitPower }];

			return store;
		});

		counterfeitPowerId = id;
		return id;
	}

	function addCounterfeitPower(counterfeitPower: NormalDisciplinePowerUnion) {
		characterCreationStore.update((store) => {
			if (attachFormulaMode === 'Discipline') {
				let entryToEdit = store.disciplines.find((e) => e.name === 'Thin-Blood Alchemy');
				if (!entryToEdit) return store;
				if (!entryToEdit.thinBloodCounterfeitDisciplinePower) {
					entryToEdit.thinBloodCounterfeitDisciplinePower = [];
				}

				if (entryToEdit.thinBloodCounterfeitDisciplinePower.some((e) => e === counterfeitPower)) {
					return store;
				}

				entryToEdit.thinBloodCounterfeitDisciplinePower = [
					...entryToEdit.thinBloodCounterfeitDisciplinePower,
					counterfeitPower
				];
			} else {
				const entryToEdit = store.formulas?.find((e) => e.id === counterfeitPowerId);
				if (!entryToEdit) return store;

				entryToEdit.counterfeitPower = counterfeitPower;
			}

			return store;
		});
	}

	function removeCounterfeitPower(counterfeitPower: NormalDisciplinePowerUnion) {
		characterCreationStore.update((store) => {
			let entryToEdit = store.disciplines.find((e) => e.name === 'Thin-Blood Alchemy');
			if (!entryToEdit) return store;
			if (!entryToEdit.thinBloodCounterfeitDisciplinePower) return store;

			entryToEdit.thinBloodCounterfeitDisciplinePower =
				entryToEdit.thinBloodCounterfeitDisciplinePower.filter((c) => c !== counterfeitPower);

			if (entryToEdit.thinBloodCounterfeitDisciplinePower.length === 0) {
				entryToEdit.thinBloodCounterfeitDisciplinePower = undefined;
			}
			return store;
		});
	}

	function deleteFormula(id: string | undefined) {
		characterCreationStore.update((store) => {
			if (!store.formulas) return store;

			store.formulas = store.formulas.filter((e) => e.id !== id);
			if (store.formulas.length === 0) {
				store.formulas = undefined;
			}

			return store;
		});
	}

	function addValue<T extends NormalDisciplinePowerUnion | RitualDisciplinePowerUnion>(
		array: T[],
		value: T
	) {
		array.push(value as T);
		return;
	}

	function getDisciplinePowers(
		discipline: RitualDisciplines | NormalDisciplines,
		maxLevel: number
	) {
		return getDisciplinePowerConfigsForDiscipline(discipline).filter((power) =>
			power.data ? power.data.level <= maxLevel : false
		);
	}
</script>

<label class="label">
	<span>Power {dot}</span>
	<select
		class="select rounded-lg"
		disabled={disableDisciplinePowerSelection}
		bind:value={selectedDisciplinePower}
		on:change={() => {
			if (!selectedDisciplinePower || !selectedDiscipline) return;

			if (attachFormulaMode === 'Discipline') {
				addDisciplinePower(selectedDiscipline, selectedDisciplinePower, previousDisciplinePower);
				dispatchChange('disciplinePowerChange', { name: selectedDisciplinePower });
			} else if (attachFormulaMode === 'AdditionalFormulas') {
				console.warn(`previousDisciplinePower: ${previousDisciplinePower}`);
				console.warn(`counterfeitPowerId: ${counterfeitPowerId}`);
				if (previousDisciplinePower && counterfeitPowerId) {
					removeFormula(counterfeitPowerId);

					console.warn(counterfeitPowerId);
					dispatchChange('removeFormula', {
						id: counterfeitPowerId,
						name: previousDisciplinePower
					});
					counterfeitPower = undefined;
				}
				const id = addFormula(selectedDisciplinePower, counterfeitPower);

				dispatchChange('newFormula', {
					id,
					name: selectedDisciplinePower,
					level: getDisciplinePowerConfigForPowerName(selectedDisciplinePower)?.level ?? 0
				});
			}

			previousDisciplinePower = selectedDisciplinePower;
		}}
	>
		<option disabled selected value={undefined}> Please select a power for that discipline </option>

		{#each getDisciplinePowers(selectedDiscipline, levelThinBloodAlchemy) as disciplinePower}
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

	{#if disciplinePowerConfig && selectedDisciplinePower}
		<div class="flex">
			<HelpText id={selectedDisciplinePower}>
				<p class="underline decoration-dotted">Power-Description</p>
				<svelte:fragment slot="helpText">
					{#if disciplinePowerConfig.amalgam}
						<p class="whitespace-pre-line">
							<span class="font-bold">Amalgam:</span>
							{disciplinePowerConfig.amalgam.name}
							{disciplinePowerConfig.amalgam.value}
						</p>
					{/if}
					{#if disciplinePowerConfig.data?.challengePool}
						<p class="whitespace-pre-line">
							<span class="font-bold">Challenge Pool:</span>
							{#if typeof disciplinePowerConfig.data.challengePool.defender === 'string'}
								{disciplinePowerConfig.data.challengePool.attacker.attribute} + {disciplinePowerConfig
									.data.challengePool.attacker.skill} vs {disciplinePowerConfig.data.challengePool
									.defender}
							{:else if 'skillOrAttribute' in disciplinePowerConfig.data.challengePool}
								{disciplinePowerConfig.data.challengePool.attacker.attribute} + {disciplinePowerConfig
									.data.challengePool.attacker.skill} vs {`${disciplinePowerConfig.data.challengePool.defender.attribute} + ${disciplinePowerConfig.data.challengePool.skillOrAttribute}`}
							{/if}

							{#if disciplinePowerConfig.data.challengePool.hint}
								{disciplinePowerConfig.data.challengePool.hint}
							{/if}
						</p>
					{/if}
					<p class="whitespace-pre-line">
						<span class="font-bold">Cost:</span>
						{disciplinePowerConfig.data?.cost}
					</p>
					{#if disciplinePowerConfig.data && 'prerequisite' in disciplinePowerConfig.data}
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{#if Array.isArray(disciplinePowerConfig.data.prerequisite)}
								{joinWithOr(disciplinePowerConfig.data.prerequisite)}
							{:else if typeof disciplinePowerConfig.data.prerequisite !== 'string' && disciplinePowerConfig.data.prerequisite?.main && disciplinePowerConfig.data.prerequisite.or}
								{disciplinePowerConfig.data.prerequisite.main} and either {joinWithOr(
									disciplinePowerConfig.data.prerequisite.or
								)}
							{:else}
								{disciplinePowerConfig.data.prerequisite}
							{/if}
						</p>
					{/if}
					<p class="whitespace-pre-line">
						{disciplinePowerConfig.data?.system}
					</p>
					<p class="whitespace-pre-line">
						<span class="font-bold">Duration:</span>
						{disciplinePowerConfig.data?.duration}
					</p>
				</svelte:fragment>
			</HelpText>
			{#if showDeleteButton}
				<button
					class="variant-filled-primary btn ml-auto w-3 rounded-lg"
					type="button"
					on:click={() => {
						if (counterfeitPowerId && selectedDisciplinePower) {
							deleteFormula(counterfeitPowerId);
							dispatchChange('removeFormula', {
								id: counterfeitPowerId,
								name: selectedDisciplinePower
							});
							selectedDisciplinePower = undefined;
							previousDisciplinePower = undefined;
						}
					}}
				>
					<iconify-icon height="12" icon="mdi:remove" />
				</button>
			{/if}
		</div>
	{/if}

	{#key counterfeitDiscipline}
		{#if selectedDisciplinePower?.match('Counterfeit')}
			<select
				class="select rounded-lg"
				bind:value={counterfeitDiscipline}
				on:change={() => {
					if (previousCounterfeitPower) {
						removeCounterfeitPower(previousCounterfeitPower);
					}

					previousCounterfeitPower = undefined;
				}}
			>
				<option disabled selected value={undefined}> Which discipline do you want to copy? </option>

				{#each disciplineName.options.filter((e) => e !== 'Thin-Blood Alchemy') as discipline}
					<option selected={counterfeitDiscipline === discipline} value={discipline}>
						{discipline}
					</option>
				{/each}
			</select>
		{/if}
	{/key}
	{#if selectedDisciplinePower?.match('Counterfeit') && counterfeitDiscipline}
		<select
			class="select rounded-lg"
			bind:value={counterfeitPower}
			on:change={() => {
				console.warn(counterfeitPower);
				if (counterfeitPower) {
					addCounterfeitPower(counterfeitPower);
					if (previousCounterfeitPower) {
						removeCounterfeitPower(previousCounterfeitPower);
					}
					previousCounterfeitPower = counterfeitPower;
					//dispatchChange('disciplinePowerChange', { name: selectedDisciplinePower });
				}
			}}
		>
			<option disabled selected value={undefined}> Which power do you want to copy? </option>

			{#each getDisciplinePowerConfigsForDiscipline(counterfeitDiscipline)
				.filter((d) => (d.data?.level ? d.data.level === counterfeitLevel : false))
				.filter((d) => !d.amalgam) as power}
				<option selected={counterfeitPower === power.name} value={power.name}>
					{power.name} (Level: {power.data?.level})
				</option>
			{/each}
		</select>
	{/if}
	{#if counterfeitPower && counterfeitPowerConfig}
		<div class="flex">
			<HelpText id={counterfeitPower}>
				<p class="underline decoration-dotted">Power-Description</p>
				<svelte:fragment slot="helpText">
					{#if counterfeitPowerConfig.amalgam}
						<p class="whitespace-pre-line">
							<span class="font-bold">Amalgam:</span>
							{counterfeitPowerConfig.amalgam.name}
							{counterfeitPowerConfig.amalgam.value}
						</p>
					{/if}
					{#if counterfeitPowerConfig.data?.challengePool}
						<p class="whitespace-pre-line">
							<span class="font-bold">Challenge Pool:</span>
							{#if typeof counterfeitPowerConfig.data.challengePool.defender === 'string'}
								{counterfeitPowerConfig.data.challengePool.attacker.attribute} + {counterfeitPowerConfig
									.data.challengePool.attacker.skill} vs {counterfeitPowerConfig.data.challengePool
									.defender}
							{:else if 'skillOrAttribute' in counterfeitPowerConfig.data.challengePool}
								{counterfeitPowerConfig.data.challengePool.attacker.attribute} + {counterfeitPowerConfig
									.data.challengePool.attacker.skill} vs {`${counterfeitPowerConfig.data.challengePool.defender.attribute} + ${counterfeitPowerConfig.data.challengePool.skillOrAttribute}`}
							{/if}

							{#if counterfeitPowerConfig.data.challengePool.hint}
								{counterfeitPowerConfig.data.challengePool.hint}
							{/if}
						</p>
					{/if}
					<p class="whitespace-pre-line">
						<span class="font-bold">Cost:</span>
						{counterfeitPowerConfig.data?.cost}
					</p>
					{#if counterfeitPowerConfig.data && 'prerequisite' in counterfeitPowerConfig.data}
						<p class="whitespace-pre-line">
							<span class="font-bold">Prerequisite:</span>
							{#if Array.isArray(counterfeitPowerConfig.data.prerequisite)}
								{joinWithOr(counterfeitPowerConfig.data.prerequisite)}
							{:else if typeof counterfeitPowerConfig.data.prerequisite !== 'string' && counterfeitPowerConfig.data.prerequisite?.main && counterfeitPowerConfig.data.prerequisite.or}
								{counterfeitPowerConfig.data.prerequisite.main} and either {joinWithOr(
									counterfeitPowerConfig.data.prerequisite.or
								)}
							{:else}
								{counterfeitPowerConfig.data.prerequisite}
							{/if}
						</p>
					{/if}
					<p class="whitespace-pre-line">
						{counterfeitPowerConfig.data?.system}
					</p>
					<p class="whitespace-pre-line">
						<span class="font-bold">Duration:</span>
						{counterfeitPowerConfig.data?.duration}
					</p>
				</svelte:fragment>
			</HelpText>
		</div>
	{/if}
</label>
