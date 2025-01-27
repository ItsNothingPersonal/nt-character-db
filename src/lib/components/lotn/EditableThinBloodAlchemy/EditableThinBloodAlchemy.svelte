<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import {
		type NormalDisciplinePowerUnion,
		type RitualDisciplinePowerUnion
	} from '$lib/zod/lotn/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getDisciplinePowerConfigForPowerName } from '../util/disciplines';
	import { createNumberList } from '../util/generalUtils';
	import EditableThinBloodAlchemyPower from './EditableThinBloodAlchemyPower.svelte';

	export let disciplineValue: number;
	export let dotList: number[] = createNumberList(5);
	let additionalDotList: number[] = [];

	export let disableDots: boolean = false;
	export let disableDisciplinePowerSelection: boolean = false;
	export let showDisciplinePowerDeleteButton: boolean = false;
	export let selectedDisciplinePowers:
		| (NormalDisciplinePowerUnion | RitualDisciplinePowerUnion)[]
		| undefined = undefined;
	export let selectedValue: number;
	export let enableAdditionalFormulas: boolean = false;

	let previousDisciplineValue: number;
	$: discipline = $characterCreationStore.disciplines.find((e) => e.name === 'Thin-Blood Alchemy');

	onMount(() => {
		additionalDotList = createNumberList($characterCreationStore.formulas?.length);
		previousDisciplineValue = disciplineValue;
	});

	const dispatchChange = createEventDispatcher<{
		disciplineChange: { name: DisciplineName; label: string; value: number };
		disciplineValueChange: { name: DisciplineName; new: number; old: number };
		disciplinePowerChange: {
			name: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
		};
		disciplineDelete: { name: DisciplineName | undefined };
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

	function changeDisciplineValue() {
		characterCreationStore.update((store) => {
			const indexSelected = store.disciplines.findIndex((e) => e.name === 'Thin-Blood Alchemy');
			if (indexSelected === -1) return store;

			store.disciplines[indexSelected].value = selectedValue;
			store.disciplines[indexSelected].powers = store.disciplines[indexSelected].powers.slice(
				0,
				selectedValue
			);

			if (previousDisciplineValue > selectedValue) {
				store.formulas?.forEach((f) => {
					const formulaLevel = getDisciplinePowerConfigForPowerName(f.formula)?.level;
					if (!formulaLevel) return;

					if (formulaLevel > selectedValue) {
						dispatchChange('removeFormula', { id: f.id, name: f.formula });
					}
				});

				store.formulas = store.formulas?.filter(
					(f) => (getDisciplinePowerConfigForPowerName(f.formula)?.level ?? 0) <= selectedValue
				);

				if (store.formulas?.length === 0) {
					store.formulas = undefined;
				}

				additionalDotList = createNumberList($characterCreationStore.formulas?.length);
			}

			return store;
		});

		dispatchChange('disciplineValueChange', {
			name: 'Thin-Blood Alchemy',
			new: selectedValue,
			old: previousDisciplineValue
		});
		previousDisciplineValue = selectedValue;
	}

	function getFormulaByIndex(index: number) {
		if (!$characterCreationStore.formulas) return;

		return $characterCreationStore.formulas[index];
	}
</script>

<div class="flex flex-col gap-2">
	<span> Thin-Blood Alchemy </span>
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

	{#each createNumberList(disciplineValue) as dot}
		{#if discipline}
			<li>
				<EditableThinBloodAlchemyPower
					counterfeitPowerId={discipline?.powers[dot - 1].name}
					disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
						(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
					disciplinePower={discipline.powers[dot - 1]}
					{dot}
					levelThinBloodAlchemy={dot}
				/>
			</li>
		{/if}
	{/each}

	{#if enableAdditionalFormulas}
		<hr class="my-4" />

		<button
			class="variant-filled-primary btn rounded-lg"
			type="button"
			on:click={() => {
				additionalDotList = [...additionalDotList, additionalDotList.length + 1];
			}}
		>
			Add Extra Formula
		</button>

		{#key additionalDotList}
			{#each additionalDotList as dot}
				{#if !disableDisciplinePowerSelection}
					{#if getFormulaByIndex(dot - 1)?.formula}
						{#await Promise.resolve(getFormulaByIndex(dot - 1)?.formula) then formulaResult}
							{#if formulaResult}
								<EditableThinBloodAlchemyPower
									attachFormulaMode="AdditionalFormulas"
									counterfeitPower={getFormulaByIndex(dot - 1)?.counterfeitPower}
									counterfeitPowerId={getFormulaByIndex(dot - 1)?.id}
									disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
										(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
									disciplinePower={{ name: formulaResult }}
									{dot}
									levelThinBloodAlchemy={selectedValue}
									showDeleteButton={showDisciplinePowerDeleteButton}
									on:newFormula={(e) => dispatchChange('newFormula', e.detail)}
									on:removeFormula={(e) => {
										dispatchChange('removeFormula', e.detail);
										additionalDotList = createNumberList($characterCreationStore.formulas?.length);
									}}
								/>
							{/if}
						{/await}
					{/if}
				{/if}
			{/each}
		{/key}
	{/if}
</div>
