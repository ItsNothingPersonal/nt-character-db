<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { generateId } from '$lib/util';
	import { type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import type { PlayerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline';
	import {
		ritualDisciplinePowerUnion,
		type NormalDisciplinePowerUnion,
		type RitualDisciplinePowerUnion
	} from '$lib/zod/lotn/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import { addDiscipline, getDisciplinePowerConfigForPowerName } from '../util/disciplines';
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

	onMount(() => {
		if (!$characterCreationStore.disciplines.some((e) => e.name === 'Thin-Blood Alchemy')) {
			addDiscipline('Thin-Blood Alchemy', dotList[0], undefined);
		}

		rebuildSelectedDisciplinePowerObject();

		additionalDotList = createNumberList($characterCreationStore.formulas?.length);
		previousDisciplineValue = disciplineValue;
	});

	function rebuildSelectedDisciplinePowerObject() {
		const thinBloodDiscipline = $characterCreationStore.disciplines.find(
			(e) => e.name === 'Thin-Blood Alchemy'
		);
		if (thinBloodDiscipline) {
			const pairs = getCounterfeitedPairs(thinBloodDiscipline);
			for (let i = 0; i < pairs.length; i++) {
				selectedDisciplinePower[i + 1] = {
					id: pairs[i].id,
					power: pairs[i].original,
					counterfeitPower: pairs[i].counterfeit
				};
			}
		}
	}

	function getCounterfeitedPairs(selection: PlayerDiscipline) {
		const pairs: {
			id: string;
			original: RitualDisciplinePowerUnion;
			counterfeit: NormalDisciplinePowerUnion | undefined;
		}[] = [];
		let counterfeitedIndex = 0;

		for (const power of selection.powers) {
			if (
				/Counterfeit(?: Power)? \(Level (\d+)\)/.test(power) &&
				selection.thinBloodCounterfeitDisciplinePower
			) {
				const counterfeit =
					counterfeitedIndex < selection.thinBloodCounterfeitDisciplinePower.length
						? selection.thinBloodCounterfeitDisciplinePower[counterfeitedIndex]
						: undefined;
				pairs.push({
					id: generateId(),
					original: ritualDisciplinePowerUnion.parse(power),
					counterfeit
				});
				counterfeitedIndex++;
			} else {
				pairs.push({
					id: generateId(),
					original: ritualDisciplinePowerUnion.parse(power),
					counterfeit: undefined
				});
			}
		}

		return pairs;
	}

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

	export let selectedDisciplinePower: Record<
		number,
		{
			id: string;
			power: RitualDisciplinePowerUnion | undefined;
			counterfeitPower: NormalDisciplinePowerUnion | undefined;
		}
	> = {};

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
				let thinBloodCounterfeitDisciplinePower =
					store.disciplines[indexSelected].thinBloodCounterfeitDisciplinePower;
				if (thinBloodCounterfeitDisciplinePower) {
					thinBloodCounterfeitDisciplinePower = thinBloodCounterfeitDisciplinePower.filter((e) =>
						e ? (getDisciplinePowerConfigForPowerName(e)?.level ?? 0) + 1 <= selectedValue : false
					);
				}

				if (store.disciplines[indexSelected].thinBloodCounterfeitDisciplinePower?.length === 0) {
					store.disciplines[indexSelected].thinBloodCounterfeitDisciplinePower = undefined;
				}

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

				rebuildSelectedDisciplinePowerObject();
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

	{#key selectedValue || selectedDisciplinePower}
		{#each createNumberList(selectedValue) as dot}
			{#if !disableDisciplinePowerSelection || (disableDisciplinePowerSelection && selectedDisciplinePower[Number(dot)] !== undefined)}
				{#key selectedDisciplinePower[Number(dot)]}
					<EditableThinBloodAlchemyPower
						counterfeitPower={selectedDisciplinePower[Number(dot)]?.counterfeitPower}
						counterfeitPowerId={selectedDisciplinePower[Number(dot)]?.id}
						disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
							(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
						{dot}
						levelThinBloodAlchemy={dot}
						selectedDiscipline="Thin-Blood Alchemy"
						selectedDisciplinePower={selectedDisciplinePower[Number(dot)]?.power}
					/>
				{/key}
			{/if}
		{/each}
	{/key}

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
					<EditableThinBloodAlchemyPower
						attachFormulaMode="AdditionalFormulas"
						counterfeitPower={getFormulaByIndex(dot - 1)?.counterfeitPower}
						counterfeitPowerId={getFormulaByIndex(dot - 1)?.id}
						disableDisciplinePowerSelection={disableDisciplinePowerSelection ||
							(selectedDisciplinePowers && selectedDisciplinePowers.length >= 2)}
						{dot}
						levelThinBloodAlchemy={selectedValue}
						selectedDiscipline="Thin-Blood Alchemy"
						selectedDisciplinePower={getFormulaByIndex(dot - 1)?.formula}
						showDeleteButton={showDisciplinePowerDeleteButton}
						on:newFormula={(e) => dispatchChange('newFormula', e.detail)}
						on:removeFormula={(e) => {
							dispatchChange('removeFormula', e.detail);
							additionalDotList = createNumberList($characterCreationStore.formulas?.length);
						}}
					/>
				{/if}
			{/each}
		{/key}
	{/if}
</div>
