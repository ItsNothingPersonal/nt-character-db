<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import type {
		NormalDisciplinePowerUnion,
		NormalDisciplines,
		RitualDisciplinePowerUnion,
		RitualDisciplines
	} from '$lib/zod/lotn/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { getDisciplinePowerConfigsForDiscipline } from '../util/disciplines';
	import { joinWithOr } from '../util/generalUtils';

	export let dot: number;

	export let selectedDiscipline: NormalDisciplines | RitualDisciplines;
	export let selectedDisciplinePower:
		| NormalDisciplinePowerUnion
		| RitualDisciplinePowerUnion
		| undefined;
	export let disableDisciplinePowerSelection: boolean = false;
	export let showDeleteButton: boolean = false;

	onMount(() => {
		previousDisciplinePower = selectedDisciplinePower;
	});

	let previousDisciplinePower: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
	$: disciplinePowerConfig = getDisciplinePowerConfigsForDiscipline(selectedDiscipline).find(
		(e) => e.name === selectedDisciplinePower
	);

	const dispatchChange = createEventDispatcher<{
		disciplinePowerChange: {
			name: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
		};
	}>();

	function addDisciplinePower(
		discipline: NormalDisciplines | RitualDisciplines,
		power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion,
		previousPower: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined
	) {
		characterCreationStore.update((store) => {
			let entryToEdit = store.disciplines.find((e) => e.name === discipline);
			if (!entryToEdit) return store;
			if (entryToEdit.powers.some((e) => e === power)) {
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

	function deleteDisciplinePower(
		discipline: NormalDisciplines | RitualDisciplines,
		power: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion
	) {
		characterCreationStore.update((store) => {
			let entryToEdit = store.disciplines.find((e) => e.name === discipline);
			if (!entryToEdit) return store;

			const index = store.disciplines.findIndex((e) => e.name === discipline);
			const indexPower = entryToEdit.powers.findIndex((e) => e === power);

			entryToEdit.powers.splice(indexPower, 1);
			store.disciplines[index] = entryToEdit;

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
							(d) => d.name === discipline && d.powers.some((p) => p === power.name)
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
</script>

<label class="label">
	<span>Power {dot}</span>
	<select
		class="select rounded-lg"
		disabled={disableDisciplinePowerSelection}
		bind:value={selectedDisciplinePower}
		on:change={() => {
			if (selectedDiscipline && selectedDisciplinePower) {
				addDisciplinePower(selectedDiscipline, selectedDisciplinePower, previousDisciplinePower);
				previousDisciplinePower = selectedDisciplinePower;

				dispatchChange('disciplinePowerChange', { name: selectedDisciplinePower });
			}
		}}
	>
		<option disabled selected value={undefined}> Please select a power for that discipline </option>

		{#each getDisciplinePowers(selectedDiscipline, dot) as disciplinePower}
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
						if (selectedDiscipline && selectedDisciplinePower) {
							deleteDisciplinePower(selectedDiscipline, selectedDisciplinePower);
							dispatchChange('disciplinePowerChange', { name: selectedDisciplinePower });
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
</label>
