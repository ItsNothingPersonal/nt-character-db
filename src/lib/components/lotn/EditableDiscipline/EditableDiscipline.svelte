<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import {
		type NormalDisciplinePowerUnion,
		type RitualDisciplinePowerUnion
	} from '$lib/zod/lotn/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import { bloodSorceryRitualConfig } from '../config/bloodSorceryRitualsConfig';
	import { ceremoniesConfig } from '../config/ceremoniesConfig';
	import { addDiscipline } from '../util/disciplines';
	import { createNumberList } from '../util/generalUtils';
	import EditableDisciplinePower from './EditableDisciplinePower.svelte';

	export let label: string;
	export let disciplineValue: number;
	export let disciplines: DisciplineName[];
	export let dotList: number[];
	export let selectedDiscipline: DisciplineName | undefined = undefined;
	export let disableDisciplineSelection: boolean = false;
	export let disableDots: boolean = false;
	export let disableDisciplinePowerSelection: boolean = false;
	export let showDisciplinePowerDeleteButton: boolean = false;
	export let selectedDisciplinePowers:
		| (NormalDisciplinePowerUnion | RitualDisciplinePowerUnion)[]
		| undefined = undefined;
	export let selectedValue: number;
	export let showDeleteButton: boolean = false;
	export let hideDotDisplay: boolean = false;
	export let showOnlyFirstPower: boolean = false;

	let previousDiscipline: DisciplineName | undefined = undefined;
	let previousDisciplineValue: number = 0;

	onMount(() => {
		if (!selectedDiscipline) return;

		if (!$characterCreationStore.disciplines.some((e) => e.name === selectedDiscipline)) {
			addDiscipline(selectedDiscipline, dotList[dotList.length - 1], previousDiscipline);
		}

		rebuildSelectedDisciplinePower();

		previousDiscipline = selectedDiscipline;
		previousDisciplineValue = disciplineValue;
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

	function rebuildSelectedDisciplinePower() {
		$characterCreationStore.disciplines
			.find((e) => e.name === selectedDiscipline)
			?.powers.forEach((e, i) => {
				selectedDisciplinePower[i + 1] = e;
			});
	}

	function changeDiscipline() {
		if (!selectedDiscipline) return;
		characterCreationStore.update((store) => {
			if (!selectedDiscipline) return store;

			const indexPrevious = store.disciplines.findIndex((e) => e.name === previousDiscipline);
			const indexSelected = store.disciplines.findIndex((e) => e.name === selectedDiscipline);

			if (indexPrevious !== -1 && indexSelected !== -1 && previousDiscipline) {
				store.disciplines[indexPrevious].name = selectedDiscipline;
				store.disciplines[indexPrevious].powers = [];
				store.disciplines[indexSelected].name = previousDiscipline;
				store.disciplines[indexSelected].powers = [];
			} else {
				addDiscipline(selectedDiscipline, dotList[dotList.length - 1], previousDiscipline);
			}

			rebuildSelectedDisciplinePower();

			return store;
		});

		dispatchChange('disciplineChange', { name: selectedDiscipline, label, value: selectedValue });
		previousDiscipline = selectedDiscipline;
	}

	function changeDisciplineValue() {
		if (!selectedDiscipline) return;

		characterCreationStore.update((store) => {
			const indexSelected = store.disciplines.findIndex((e) => e.name === selectedDiscipline);
			if (indexSelected === -1) return store;

			store.disciplines[indexSelected].value = selectedValue;
			if (previousDisciplineValue > selectedValue) {
				store.disciplines[indexSelected].powers = store.disciplines[indexSelected].powers.slice(
					0,
					selectedValue
				);
			}

			rebuildSelectedDisciplinePower();

			return store;
		});

		dispatchChange('disciplineValueChange', {
			name: selectedDiscipline,
			new: selectedValue,
			old: previousDisciplineValue
		});
		previousDisciplineValue = selectedValue;
	}

	function deleteDiscipline() {
		if (!selectedDiscipline) return;

		characterCreationStore.update((store) => {
			store.disciplines = store.disciplines.filter((e) => e.name !== selectedDiscipline);

			if (selectedDiscipline === 'Blood Sorcery') {
				store.rituals.forEach((ritual) => {
					const config = bloodSorceryRitualConfig.rituals[ritual];
					if (!config) return;

					store.experience = store.experience.filter(
						(exp) => !exp.reason.match(`Blood Sorcery Ritual ${ritual}`)
					);

					store.rituals = store.rituals.filter((r) => r !== ritual);
				});
			} else if (selectedDiscipline === 'Oblivion') {
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
							name: selectedDiscipline
						});
						selectedDiscipline = undefined;
						selectedValue = 0;
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
			bind:value={selectedDiscipline}
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
				bind:value={selectedValue}
				on:change={changeDisciplineValue}
			>
				{#each dotList as dot}
					<option selected={dot === selectedValue} value={dot}>
						{dot}
					</option>
				{/each}
			</select>
		</label>
	{/if}

	{#if selectedDiscipline}
		{#each createNumberList(showOnlyFirstPower ? 1 : disciplineValue) as dot}
			{#if !disableDisciplinePowerSelection || (disableDisciplinePowerSelection && selectedDisciplinePower[Number(dot)] !== undefined)}
				{#key selectedDisciplinePower[Number(dot)]}
					<EditableDisciplinePower
						disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
							(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
						dot={Number(dot)}
						{selectedDiscipline}
						selectedDisciplinePower={selectedDisciplinePower[Number(dot)]}
						showDeleteButton={showDisciplinePowerDeleteButton}
					/>
				{/key}
			{/if}
		{/each}
	{/if}
</div>
