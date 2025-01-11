<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { deepClone } from '$lib/util';
	import { type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import type { PlayerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline';
	import {
		type NormalDisciplinePowerUnion,
		type RitualDisciplinePowerUnion
	} from '$lib/zod/lotn/util';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, onMount } from 'svelte';
	import HelpText from '../characterSheet/components/HelpText.svelte';
	import { bloodSorceryRitualConfig } from '../config/bloodSorceryRitualsConfig';
	import { ceremoniesConfig } from '../config/ceremoniesConfig';
	import { addDiscipline, getDisciplineConfig } from '../util/disciplines';
	import { createNumberList, isMobileScreen } from '../util/generalUtils';
	import EditableDisciplinePower from './EditableDisciplinePower.svelte';

	export let label: string;
	export let discipline: PlayerDiscipline | undefined;
	export let disciplines: DisciplineName[] = discipline ? [discipline.name] : [];
	export let dotList: number[] = createNumberList(discipline?.value);
	export let disableDisciplineSelection: boolean = false;
	export let disableDots: boolean = false;
	export let disableDisciplinePowerSelection: boolean = false;
	export let showDisciplinePowerDeleteButton: boolean = false;
	export let selectedDisciplinePowers:
		| (NormalDisciplinePowerUnion | RitualDisciplinePowerUnion)[]
		| undefined = undefined;
	export let showDeleteButton = false;
	export let hideDotDisplay = false;
	export let showOnlyFirstPower = false;
	export let editModeEnabled = false;
	export let initSelectedValue: number | undefined = undefined;

	let previousDiscipline: PlayerDiscipline | undefined = undefined;

	$: selectedDisciplineName = discipline?.name;
	$: selectedDisciplineValue = discipline?.value ?? 0;

	$: disciplineConfig = discipline ? getDisciplineConfig(discipline.name) : undefined;

	onMount(() => {
		if (
			!$characterCreationStore.disciplines.some((e) => e.name === discipline?.name) &&
			discipline
		) {
			addDiscipline(discipline.name, dotList[dotList.length - 1], previousDiscipline?.name);
		}

		if (discipline) {
			rebuildSelectedDisciplinePower(discipline.powers);
		}
		selectedDisciplineValue = initSelectedValue ? initSelectedValue : (discipline?.value ?? 1);
		previousDiscipline = deepClone(discipline);
	});

	const dispatchChange = createEventDispatcher<{
		disciplineChange: { name: DisciplineName; label: string; value: number };
		disciplineValueChange: { name: DisciplineName; new: number; old: number };
		disciplinePowerChange: {
			name: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
		};
		disciplineDelete: { name: DisciplineName | undefined };
	}>();

	export let selectedDisciplinePower: Record<
		number,
		NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined
	> = {
		1: undefined,
		2: undefined,
		3: undefined,
		4: undefined,
		5: undefined
	};

	function rebuildSelectedDisciplinePower(
		diciplinePowers: NormalDisciplinePowerUnion[] | RitualDisciplinePowerUnion[]
	) {
		diciplinePowers.forEach((e, i) => {
			selectedDisciplinePower[i + 1] = e;
		});
	}

	function changeDiscipline() {
		if (!selectedDisciplineName) return;
		characterCreationStore.update((store) => {
			const indexPrevious = store.disciplines.findIndex((e) => e.name === previousDiscipline?.name);
			const indexSelected = store.disciplines.findIndex((e) => e.name === selectedDisciplineName);

			if (
				indexPrevious !== -1 &&
				indexSelected !== -1 &&
				previousDiscipline &&
				selectedDisciplineName
			) {
				store.disciplines[indexPrevious].name = selectedDisciplineName;
				store.disciplines[indexPrevious].powers = [];
				store.disciplines[indexSelected].name = previousDiscipline.name;
				store.disciplines[indexSelected].powers = [];
			} else if (selectedDisciplineName) {
				addDiscipline(
					selectedDisciplineName,
					dotList[dotList.length - 1],
					previousDiscipline?.name
				);
			}

			if (indexSelected !== -1) {
				rebuildSelectedDisciplinePower(store.disciplines[indexSelected].powers);
			}

			return store;
		});
		dispatchChange('disciplineChange', {
			name: selectedDisciplineName,
			label: selectedDisciplineName,
			value: selectedDisciplineValue
		});
		previousDiscipline = discipline;
	}

	function changeDisciplineValue(value: number) {
		if (!discipline) return;

		characterCreationStore.update((store) => {
			const indexSelected = store.disciplines.findIndex((e) => e.name === discipline?.name);
			if (indexSelected === -1) return store;

			store.disciplines[indexSelected].value = value;
			if (previousDiscipline && previousDiscipline.value > value) {
				store.disciplines[indexSelected].powers = store.disciplines[indexSelected].powers.slice(
					0,
					value
				);
			}

			rebuildSelectedDisciplinePower(store.disciplines[indexSelected].powers);

			return store;
		});

		dispatchChange('disciplineValueChange', {
			name: discipline.name,
			new: value,
			old: previousDiscipline?.value ?? 0
		});
		previousDiscipline = deepClone(discipline);
		selectedDisciplineValue = value;
	}

	function deleteDiscipline() {
		if (!discipline) return;

		characterCreationStore.update((store) => {
			if (!discipline) return store;
			store.disciplines = store.disciplines.filter((e) => e.name !== discipline?.name);

			if (discipline.name === 'Blood Sorcery') {
				store.rituals.forEach((ritual) => {
					const config = bloodSorceryRitualConfig.rituals[ritual];
					if (!config) return;

					store.experience = store.experience.filter(
						(exp) => !exp.reason.match(`Blood Sorcery Ritual ${ritual}`)
					);

					store.rituals = store.rituals.filter((r) => r !== ritual);
				});
			} else if (discipline.name === 'Oblivion') {
				store.ceremonies.forEach((ceremony) => {
					const config = ceremoniesConfig.ceremonies[ceremony];
					if (!config) return;

					store.experience = store.experience.filter(
						(exp) => !exp.reason.match(`Oblivion Ceremony ${ceremony}`)
					);

					store.ceremonies = store.ceremonies.filter((c) => c !== ceremony);
				});
			}

			return store;
		});
	}
</script>

{#if editModeEnabled}
	<div class="flex flex-col gap-2">
		<label class="label">
			<div class="flex justify-between">
				<span>{label}</span>
				{#if showDeleteButton}
					<button
						class="variant-filled-primary btn ml-auto w-3 rounded-lg"
						type="button"
						on:click={() => {
							deleteDiscipline();
							dispatchChange('disciplineDelete', {
								name: discipline?.name
							});
							discipline = undefined;

							selectedDisciplinePower = {
								1: undefined,
								2: undefined,
								3: undefined,
								4: undefined,
								5: undefined
							};
						}}
					>
						<iconify-icon height="12" icon="mdi:remove" />
					</button>
				{/if}
			</div>
			<select
				class="select rounded-lg"
				disabled={disciplines.length === 1 || disableDisciplineSelection}
				bind:value={selectedDisciplineName}
				on:change={changeDiscipline}
			>
				<option disabled selected value={undefined}> Please select a discipline </option>
				{#each disciplines as discipline}
					<option value={discipline}>
						{discipline}
					</option>
				{/each}
			</select>
		</label>
		{#if !hideDotDisplay}
			<label class="label">
				<span>Dots</span>
				<select
					class="select rounded-lg"
					disabled={dotList.length === 1 || disableDots}
					on:change={(event) => changeDisciplineValue(Number(event.currentTarget.value))}
				>
					{#each dotList as dot}
						<option selected={dot === selectedDisciplineValue} value={dot}>
							{dot}
						</option>
					{/each}
				</select>
			</label>
		{/if}

		{#each createNumberList(showOnlyFirstPower ? 1 : selectedDisciplineValue) as dot}
			{#if (!disableDisciplinePowerSelection || (disableDisciplinePowerSelection && selectedDisciplinePower[Number(dot)] !== undefined)) && selectedDisciplineName}
				{#key selectedDisciplinePower[Number(dot)]}
					<EditableDisciplinePower
						disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
							(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
						dot={Number(dot)}
						{editModeEnabled}
						selectedDiscipline={selectedDisciplineName}
						selectedDisciplinePower={selectedDisciplinePower[Number(dot)]}
						showDeleteButton={showDisciplinePowerDeleteButton}
					/>
				{/key}
			{/if}
		{/each}
	</div>
{:else if discipline && disciplineConfig}
	<div class="card flex flex-col rounded-lg p-4">
		<label class="label grid w-full grid-cols-2 grid-rows-1" for={discipline.name}>
			<HelpText id={discipline.name} placement={isMobileScreen() ? 'bottom' : 'right'}>
				<span id={discipline.name} class="font-bold">{discipline.name}</span>
				<svelte:fragment slot="helpText">
					<p class="whitespace-pre-line">
						<span class="font-bold">Typ:</span>
						{#if typeof disciplineConfig.characteristics.type === 'string'}
							{disciplineConfig.characteristics.type}
						{:else}
							{disciplineConfig.characteristics.type.text}. {disciplineConfig.characteristics.type
								.hint}
						{/if}
					</p>
					<br />
					<p class="whitespace-pre-line">
						<span class="font-bold">Masquerade Threat:</span>
						{disciplineConfig.characteristics.masqueradeThreat.type}

						{#if disciplineConfig.characteristics.masqueradeThreat.description}
							<br />
							{disciplineConfig.characteristics.masqueradeThreat.description}
						{/if}
					</p>

					{#if disciplineConfig.characteristics.description}
						<br />
						<p class="whitespace-pre-line">
							{disciplineConfig.characteristics.description}
						</p>
					{/if}
				</svelte:fragment>
			</HelpText>
			<p id={discipline.name}>
				<Ratings justify="justify-left" max={5} bind:value={discipline.value}>
					<svelte:fragment slot="empty">
						<iconify-icon icon="prime:circle" />
					</svelte:fragment>
					<svelte:fragment slot="full">
						<iconify-icon icon="prime:circle-fill" />
					</svelte:fragment>
				</Ratings>
			</p>
			<ol class="list col-span-2">
				{#each createNumberList(showOnlyFirstPower ? 1 : discipline.value) as dot}
					<li>
						<EditableDisciplinePower
							disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
								(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
							dot={Number(dot)}
							selectedDiscipline={discipline.name}
							selectedDisciplinePower={selectedDisciplinePower[Number(dot)]}
							showDeleteButton={showDisciplinePowerDeleteButton}
						/>
					</li>
				{/each}
			</ol>
		</label>
	</div>
{/if}
