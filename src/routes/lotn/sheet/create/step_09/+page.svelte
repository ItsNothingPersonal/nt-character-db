<script lang="ts">
	import EditableBloodSorceryRitual from '$lib/components/lotn/EditableBloodSorceryRitual/EditableBloodSorceryRitual.svelte';
	import EditableDiscipline from '$lib/components/lotn/EditableDiscipline/EditableDiscipline.svelte';
	import EditableOblivionCeremony from '$lib/components/lotn/EditableOblivionCeremony/EditableOblivionCeremony.svelte';
	import EditableThinBloodAlchemy from '$lib/components/lotn/EditableThinBloodAlchemy/EditableThinBloodAlchemy.svelte';
	import {
		addBloodSorceryRitualPowers,
		addOblivionCeremonyPowers,
		deleteBloodSorceryRitualPowers,
		deleteOblivionCeremonyPowers,
		getDisciplineValue,
		getValidDisciplines,
		updateBloodSorceryRitualPowers,
		updateOblivionCeremonyPowers
	} from '$lib/components/lotn/util/disciplines';
	import { hasThinBloodAlchemyMerit } from '$lib/components/lotn/util/meritUtil';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { disciplineFreebieStore } from '$lib/stores/disciplineFreebieStore';
	import { type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import type { NormalDisciplinePowerUnion, RitualDisciplinePowerUnion } from '$lib/zod/lotn/util';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';

	const debugSub = characterCreationStore.subscribe((value) =>
		console.warn(JSON.stringify(value, undefined, 2))
	);

	onMount(() => {
		if (!selectedClan) {
			return;
		}

		if ($characterCreationStore.ghoul) {
			const store = disciplineFreebieStore.getStore();
			const twoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => e.name === get(store).disciplines[0].name
			);
			disciplineA = twoDotDiscipline?.name;
			disciplineAPowers = twoDotDiscipline?.powers ?? [];

			const secondTwoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => e.name === get(store).disciplines[1].name
			);
			disciplineB = secondTwoDotDiscipline?.name;
			disciplineBPowers = secondTwoDotDiscipline?.powers ?? [];
		} else {
			const store = disciplineFreebieStore.getStore();
			const twoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => get(store).disciplines.find((d) => d.value === 2)?.name === e.name
			);
			disciplineA = twoDotDiscipline?.name;

			const firstOneDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => get(store).disciplines.find((d) => d.value === 1)?.name === e.name
			);
			disciplineB = firstOneDotDiscipline?.name;

			const secondOneDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => get(store).disciplines.find((d) => d.value === 1)?.name === e.name
			);
			disciplineC = secondOneDotDiscipline?.name;
		}
	});

	onDestroy(() => {
		debugSub();
	});

	$: selectedClan = $characterCreationStore.clan;
	$: {
		if ($characterCreationStore.ghoul) {
			const store = disciplineFreebieStore.getStore();
			const twoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => e.name === get(store).disciplines[0].name
			);
			disciplineA = twoDotDiscipline?.name;
			disciplineAPowers = twoDotDiscipline?.powers ?? [];

			if (get(store).disciplines.length > 1) {
				const secondTwoDotDiscipline = $characterCreationStore.disciplines.find(
					(e) => e.name === get(store).disciplines[1].name
				);
				disciplineB = secondTwoDotDiscipline?.name;
				disciplineBPowers = secondTwoDotDiscipline?.powers ?? [];
			}
		}
	}

	let disciplineA: DisciplineName | undefined = undefined;
	let disciplineB: DisciplineName | undefined = undefined;
	let disciplineC: DisciplineName | undefined = undefined;

	let disciplineAPowers: (NormalDisciplinePowerUnion | RitualDisciplinePowerUnion)[] = [];
	let disciplineBPowers: (NormalDisciplinePowerUnion | RitualDisciplinePowerUnion)[] = [];

	function adjustSelectionBox(
		event: CustomEvent<{ name: DisciplineName; label: string; value: number }>
	) {
		switch (event.detail.label) {
			case 'Discipline A':
				if (disciplineB === event.detail.name) {
					disciplineB = disciplineA;
				} else if (disciplineC === event.detail.name) {
					disciplineC = disciplineA;
				}

				if (disciplineA) {
					disciplineFreebieStore.removeDiscipline(disciplineA);
					if (disciplineA === 'Blood Sorcery') {
						characterCreationStore.update((store) => {
							store.rituals = [];
							return store;
						});
					}
				}
				disciplineA = event.detail.name;
				disciplineAPowers = [];

				break;
			case 'Discipline B':
				if (disciplineA === event.detail.name) {
					disciplineA = disciplineB;
				} else if (disciplineC === event.detail.name) {
					disciplineC = disciplineB;
				}

				if (disciplineB) {
					disciplineFreebieStore.removeDiscipline(disciplineB);
					if (disciplineB === 'Blood Sorcery') {
						characterCreationStore.update((store) => {
							store.rituals = [];
							return store;
						});
					}
				}
				disciplineB = event.detail.name;
				disciplineBPowers = [];
				break;
			case 'Discipline C':
				if (disciplineA === event.detail.name) {
					disciplineA = disciplineC;
				} else if (disciplineB === event.detail.name) {
					disciplineB = disciplineC;
				}

				if (disciplineC) {
					disciplineFreebieStore.removeDiscipline(disciplineC);
					if (disciplineC === 'Blood Sorcery') {
						characterCreationStore.update((store) => {
							store.rituals = [];
							return store;
						});
					}
				}
				disciplineC = event.detail.name;
				break;
		}

		disciplineFreebieStore.setDiscipline(event.detail.name, event.detail.value);
	}

	function adjustDisciplineValue(
		event: CustomEvent<{ name: DisciplineName; new: number; old: number }>
	) {
		disciplineFreebieStore.setDiscipline(event.detail.name, event.detail.new);
	}

	function disableDisciplinePowerSelectionForGhouls() {
		return (
			$characterCreationStore.disciplines.reduce((acc, discipline) => {
				return acc + discipline.powers.length;
			}, 0) >= 2
		);
	}
</script>

{#if !selectedClan}
	<aside class="alert variant-filled-warning col-span-2 rounded-lg">
		<div>
			<iconify-icon height="48" icon="mdi:warning" />
		</div>
		<div class="alert-message">
			<h3 class="h3">Please select a clan first!</h3>
			<p>You need to have a clan to know your in-clan disciplines!</p>
		</div>
	</aside>
{:else if $characterCreationStore.ghoul}
	<div class="grid grid-cols-3 grid-rows-1 gap-2">
		{#key disciplineAPowers || disciplineBPowers}
			{#if disciplineBPowers.length < 2}
				<EditableDiscipline
					disableDisciplinePowerSelection={disableDisciplinePowerSelectionForGhouls()}
					disableDots={true}
					disciplineValue={getDisciplineValue(disciplineA)}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					hideDotDisplay={true}
					label="Discipline A"
					selectedDiscipline={disciplineA}
					selectedValue={2}
					showDisciplinePowerDeleteButton={true}
					showOnlyFirstPower={disciplineBPowers.length >= 1}
					on:disciplineChange={adjustSelectionBox}
					on:disciplinePowerChange={(event) => {
						if (event.detail.name && !disciplineAPowers.some((p) => p === event.detail.name)) {
							disciplineAPowers = [...disciplineAPowers, event.detail.name];
						} else if (event.detail.name) {
							disciplineAPowers = disciplineAPowers.filter((p) => p !== event.detail.name);
						}
					}}
				/>
			{/if}

			{#if disciplineAPowers.length < 2}
				<EditableDiscipline
					disableDisciplinePowerSelection={disableDisciplinePowerSelectionForGhouls()}
					disableDots={true}
					disciplineValue={getDisciplineValue(disciplineB)}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					hideDotDisplay={true}
					label="Discipline B"
					selectedDiscipline={disciplineB}
					selectedValue={2}
					showDisciplinePowerDeleteButton={true}
					showOnlyFirstPower={disciplineAPowers.length >= 1}
					on:disciplineChange={adjustSelectionBox}
					on:disciplinePowerChange={(event) => {
						if (event.detail.name && !disciplineBPowers.some((p) => p === event.detail.name)) {
							disciplineBPowers = [...disciplineBPowers, event.detail.name];
						} else if (event.detail.name) {
							disciplineBPowers = disciplineBPowers.filter((p) => p !== event.detail.name);
						}
					}}
				/>
			{/if}
		{/key}
	</div>
{:else if selectedClan === 'Thin-Blooded'}
	<aside class="alert variant-filled-warning col-span-2 mb-4 rounded-lg">
		<div>
			<iconify-icon height="48" icon="mdi:warning" />
		</div>
		<div class="alert-message">
			<h3 class="h3">Thin-Bloods do not learn Disciplines (the usual way)!</h3>
			<p>
				Thin-blooded characters do not learn Disciplines in the usual way. Whenever a thin-blood
				feeds, they gain one dot in one Discipline associated with the Resonance of the blood
				consumed, together with one level-one power in that Discipline. No additional powers can be
				gained in this way nor can the rating increase with XP. This Discipline choice lasts until
				the thin-blood’s Hunger reaches 5 or the next time the thin-blood feeds. Thin-bloods can
				also learn Thin-Blood Alchemy by purchasing a merit and then spending XP. See Thin-Blood
				Merits, page 187 for more information.
			</p>
		</div>
	</aside>
	{#if hasThinBloodAlchemyMerit()}
		<EditableThinBloodAlchemy disciplineValue={1} dotList={[1]} selectedValue={1} />
	{/if}
{:else}
	<div class="grid grid-cols-3 grid-rows-1 gap-2">
		{#key disciplineA}
			{#if disciplineA === 'Blood Sorcery'}
				<div class="flex flex-col gap-4">
					<EditableDiscipline
						disableDots={true}
						disciplineValue={getDisciplineValue(disciplineA)}
						disciplines={getValidDisciplines(selectedClan, true)}
						dotList={[1, 2]}
						label="Discipline A"
						selectedDiscipline={disciplineA}
						selectedValue={2}
						on:disciplineChange={adjustSelectionBox}
						on:disciplineValueChange={adjustDisciplineValue}
					/>
					<EditableBloodSorceryRitual
						enableEdit={true}
						existingBloodSorceryRituals={$characterCreationStore.rituals}
						lockFirstRitual={true}
						maxLevel={1}
						maxNumberOfRituals={1}
						showDeleteButton={true}
						on:addRitualPower={(e) => addBloodSorceryRitualPowers(e)}
						on:changeRitualPower={(e) => updateBloodSorceryRitualPowers(e)}
						on:deleteRitualPower={(e) => deleteBloodSorceryRitualPowers(e)}
					/>
				</div>
			{:else if disciplineA === 'Oblivion'}
				<div class="flex flex-col gap-4">
					<EditableDiscipline
						disableDots={true}
						disciplineValue={getDisciplineValue(disciplineA)}
						disciplines={getValidDisciplines(selectedClan, true)}
						dotList={[1, 2]}
						label="Discipline A"
						selectedDiscipline={disciplineA}
						selectedValue={2}
						on:disciplineChange={adjustSelectionBox}
						on:disciplineValueChange={adjustDisciplineValue}
					/>
					<EditableOblivionCeremony
						enableEdit={true}
						existingOblivionCeremonies={$characterCreationStore.ceremonies}
						lockFirstCeremony={true}
						maxLevel={1}
						maxNumberOfCeremonies={1}
						showDeleteButton={true}
						on:addCeremonyPower={(e) => addOblivionCeremonyPowers(e)}
						on:changeCeremonyPower={(e) => updateOblivionCeremonyPowers(e)}
						on:deleteCeremonyPower={(e) => deleteOblivionCeremonyPowers(e)}
					/>
				</div>
			{:else}
				<EditableDiscipline
					disableDots={true}
					disciplineValue={getDisciplineValue(disciplineA)}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					label="Discipline A"
					selectedDiscipline={disciplineA}
					selectedValue={2}
					on:disciplineChange={adjustSelectionBox}
				/>
			{/if}
		{/key}

		{#key disciplineB}
			{#if disciplineB === 'Blood Sorcery'}
				<div class="flex flex-col gap-4">
					<EditableDiscipline
						disableDots={true}
						disciplineValue={getDisciplineValue(disciplineB)}
						disciplines={getValidDisciplines(selectedClan, true)}
						dotList={[1]}
						label="Discipline B"
						selectedDiscipline={disciplineB}
						selectedValue={1}
						on:disciplineChange={adjustSelectionBox}
					/>
					<EditableBloodSorceryRitual
						enableEdit={true}
						existingBloodSorceryRituals={$characterCreationStore.rituals}
						lockFirstRitual={false}
						maxLevel={1}
						showDeleteButton={true}
						on:addRitualPower={(e) => addBloodSorceryRitualPowers(e)}
						on:changeRitualPower={(e) => updateBloodSorceryRitualPowers(e)}
						on:deleteRitualPower={(e) => deleteBloodSorceryRitualPowers(e)}
					/>
				</div>
			{:else if disciplineB === 'Oblivion'}
				<div class="flex flex-col gap-4">
					<EditableDiscipline
						disableDots={true}
						disciplineValue={getDisciplineValue(disciplineB)}
						disciplines={getValidDisciplines(selectedClan, true)}
						dotList={[1]}
						label="Discipline B"
						selectedDiscipline={disciplineB}
						selectedValue={1}
						on:disciplineChange={adjustSelectionBox}
						on:disciplineValueChange={adjustDisciplineValue}
					/>
					<EditableOblivionCeremony
						enableEdit={true}
						existingOblivionCeremonies={$characterCreationStore.ceremonies}
						lockFirstCeremony={true}
						maxLevel={1}
						maxNumberOfCeremonies={1}
						showDeleteButton={true}
						on:addCeremonyPower={(e) => addOblivionCeremonyPowers(e)}
						on:changeCeremonyPower={(e) => updateOblivionCeremonyPowers(e)}
						on:deleteCeremonyPower={(e) => deleteOblivionCeremonyPowers(e)}
					/>
				</div>
			{:else}
				<EditableDiscipline
					disableDots={true}
					disciplineValue={getDisciplineValue(disciplineB)}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1]}
					label="Discipline B"
					selectedDiscipline={disciplineB}
					selectedValue={1}
					on:disciplineChange={adjustSelectionBox}
				/>
			{/if}
		{/key}

		{#key disciplineC}
			{#if disciplineC === 'Blood Sorcery'}
				<div class="flex flex-col gap-4">
					<EditableDiscipline
						disableDots={true}
						disciplineValue={getDisciplineValue(disciplineC)}
						disciplines={getValidDisciplines(selectedClan)}
						dotList={[1]}
						label="Discipline C"
						selectedDiscipline={disciplineC}
						selectedValue={1}
						on:disciplineChange={adjustSelectionBox}
					/>
					<EditableBloodSorceryRitual
						enableEdit={true}
						existingBloodSorceryRituals={$characterCreationStore.rituals}
						lockFirstRitual={false}
						maxLevel={1}
						showDeleteButton={true}
						on:addRitualPower={(e) => addBloodSorceryRitualPowers(e)}
						on:changeRitualPower={(e) => updateBloodSorceryRitualPowers(e)}
						on:deleteRitualPower={(e) => deleteBloodSorceryRitualPowers(e)}
					/>
				</div>
			{:else if disciplineC === 'Oblivion'}
				<div class="flex flex-col gap-4">
					<EditableDiscipline
						disableDots={true}
						disciplineValue={getDisciplineValue(disciplineC)}
						disciplines={getValidDisciplines(selectedClan, true)}
						dotList={[1]}
						label="Discipline C"
						selectedDiscipline={disciplineC}
						selectedValue={1}
						on:disciplineChange={adjustSelectionBox}
						on:disciplineValueChange={adjustDisciplineValue}
					/>
					<EditableOblivionCeremony
						enableEdit={true}
						existingOblivionCeremonies={$characterCreationStore.ceremonies}
						lockFirstCeremony={true}
						maxLevel={1}
						maxNumberOfCeremonies={1}
						showDeleteButton={true}
						on:addCeremonyPower={(e) => addOblivionCeremonyPowers(e)}
						on:changeCeremonyPower={(e) => updateOblivionCeremonyPowers(e)}
						on:deleteCeremonyPower={(e) => deleteOblivionCeremonyPowers(e)}
					/>
				</div>
			{:else}
				<EditableDiscipline
					disableDots={true}
					disciplineValue={getDisciplineValue(disciplineC)}
					disciplines={getValidDisciplines(selectedClan)}
					dotList={[1]}
					label="Discipline C"
					selectedDiscipline={disciplineC}
					selectedValue={1}
					on:disciplineChange={adjustSelectionBox}
				/>
			{/if}
		{/key}
	</div>
{/if}
