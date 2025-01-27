<script lang="ts">
	import EditableBloodSorceryRitual from '$lib/components/lotn/EditableBloodSorceryRitual/EditableBloodSorceryRitual.svelte';
	import EditableDiscipline from '$lib/components/lotn/EditableDiscipline/EditableDiscipline.svelte';
	import EditableOblivionCeremony from '$lib/components/lotn/EditableOblivionCeremony/EditableOblivionCeremony.svelte';
	import EditableThinBloodAlchemy from '$lib/components/lotn/EditableThinBloodAlchemy/EditableThinBloodAlchemy.svelte';
	import {
		addBloodSorceryRitualPowers,
		addOblivionCeremonyPowers,
		assignDisciplinePower,
		deleteBloodSorceryRitualPowers,
		deleteOblivionCeremonyPowers,
		getValidDisciplines,
		isInClan,
		removeDisciplinePower,
		updateBloodSorceryRitualPowers,
		updateOblivionCeremonyPowers
	} from '$lib/components/lotn/util/disciplines';
	import { hasThinBloodAlchemyMerit } from '$lib/components/lotn/util/meritUtil';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { disciplineFreebieStore } from '$lib/stores/disciplineFreebieStore';
	import { type DisciplineName } from '$lib/zod/lotn/enums/disciplineName';
	import type { PlayerDiscipline } from '$lib/zod/lotn/playerCharacter/playerDiscipline';
	import {
		type NormalDisciplinePowerUnion,
		type RitualDisciplinePowerUnion
	} from '$lib/zod/lotn/util';
	import { onMount } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	onMount(() => {
		if (!selectedClan) {
			return;
		}

		if ($characterCreationStore.ghoul) {
			const store = disciplineFreebieStore.getStore();
			const twoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => e.name === get(store).disciplines[0].name
			);
			disciplineA.update((a) => {
				a = twoDotDiscipline;
				return a;
			});

			const secondTwoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => e.name === get(store).disciplines[1].name
			);
			disciplineB.update((b) => {
				b = secondTwoDotDiscipline;
				return b;
			});
		} else {
			const store = disciplineFreebieStore.getStore();

			const twoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => get(store).disciplines.find((d) => d.value === 2)?.name === e.name
			);
			disciplineA.update((a) => {
				a = twoDotDiscipline;
				return a;
			});

			const firstOneDotDiscipline = $characterCreationStore.disciplines.find((e) => {
				return (
					get(store).disciplines.find((d) => d.value === 1 && isInClan(selectedClan, d.name))
						?.name === e.name
				);
			});

			disciplineB.update((b) => {
				b = firstOneDotDiscipline;
				return b;
			});

			const secondOneDotDiscipline = $characterCreationStore.disciplines.find(
				(e) =>
					get(store).disciplines.find(
						(d) => d.value === 1 && d.name !== firstOneDotDiscipline?.name
					)?.name === e.name
			);
			disciplineC.update((c) => {
				c = secondOneDotDiscipline;
				return c;
			});
		}
	});

	$: selectedClan = $characterCreationStore.clan;
	$: {
		if ($characterCreationStore.ghoul) {
			const store = disciplineFreebieStore.getStore();
			const twoDotDiscipline = $characterCreationStore.disciplines.find(
				(e) => e.name === get(store).disciplines[0].name
			);
			disciplineA.update((a) => {
				a = twoDotDiscipline;
				return a;
			});

			if (get(store).disciplines.length > 1) {
				const secondTwoDotDiscipline = $characterCreationStore.disciplines.find(
					(e) => e.name === get(store).disciplines[1].name
				);
				disciplineB.update((b) => {
					b = secondTwoDotDiscipline;
					return b;
				});
			}
		}
	}

	let disciplineA: Writable<PlayerDiscipline | undefined> = writable(undefined);
	let disciplineB: Writable<PlayerDiscipline | undefined> = writable(undefined);
	let disciplineC: Writable<PlayerDiscipline | undefined> = writable(undefined);

	$: editModeEnabled =
		$characterCreationStore.experience.filter((e) => e.reason.match(/Discipline/)).length <= 0;
	let innerWidth = 0;

	function adjustSelectionBox(
		event: CustomEvent<{ name: DisciplineName; label: string; value: number }>
	) {
		let oldDisciplineName: DisciplineName | undefined = undefined;
		let oldDisciplineValue: number | undefined = undefined;

		switch (event.detail.label) {
			case 'Discipline A':
				oldDisciplineName = $disciplineA?.name;
				oldDisciplineValue = $disciplineA?.value;

				if ($disciplineB?.name === event.detail.name) {
					disciplineB.update((b) => {
						b = $disciplineA;
						if (b) {
							b.value = 1;
						}
						return b;
					});
				} else if ($disciplineC?.name === event.detail.name) {
					disciplineC.update((c) => {
						c = $disciplineA;
						if (c) {
							c.value = 1;
						}
						return c;
					});
				}

				if ($disciplineA) {
					disciplineFreebieStore.removeDiscipline($disciplineA.name);
					if ($disciplineA.name === 'Blood Sorcery') {
						characterCreationStore.update((store) => {
							store.rituals = [];
							return store;
						});
					}
					disciplineA.update((a) => {
						if (a) {
							a.value = 2;
						}
						return a;
					});
				}

				disciplineA.update((a) => {
					a = { name: event.detail.name, value: event.detail.value, powers: [] };
					return a;
				});
				break;
			case 'Discipline B':
				oldDisciplineName = $disciplineB?.name;
				oldDisciplineValue = $disciplineB?.value;

				if ($disciplineA?.name === event.detail.name) {
					disciplineA.update((a) => {
						a = $disciplineB;
						if (a) {
							a.value = 2;
						}
						return a;
					});
				} else if ($disciplineC?.name === event.detail.name) {
					disciplineC.update((c) => {
						c = $disciplineB;
						return c;
					});
				}

				if ($disciplineB) {
					disciplineFreebieStore.removeDiscipline($disciplineB.name);
					if ($disciplineB?.name === 'Blood Sorcery') {
						characterCreationStore.update((store) => {
							store.rituals = [];
							return store;
						});
					}
				}
				disciplineB.update((b) => {
					b = { name: event.detail.name, value: event.detail.value, powers: [] };
					return b;
				});
				break;
			case 'Discipline C':
				oldDisciplineName = $disciplineC?.name;
				oldDisciplineValue = $disciplineC?.value;

				if ($disciplineA?.name === event.detail.name) {
					disciplineA.update((a) => {
						a = $disciplineC;
						if (a) {
							a.value = 2;
						}
						return a;
					});
				} else if ($disciplineB?.name === event.detail.name) {
					disciplineB.update((b) => {
						b = $disciplineC;
						return b;
					});
				}

				if ($disciplineC) {
					disciplineFreebieStore.removeDiscipline($disciplineC.name);
					if ($disciplineC?.name === 'Blood Sorcery') {
						characterCreationStore.update((store) => {
							store.rituals = [];
							return store;
						});
					}
				}
				disciplineC.update((c) => {
					c = { name: event.detail.name, value: event.detail.value, powers: [] };
					return c;
				});
				break;
		}

		disciplineFreebieStore.setDiscipline(event.detail.name, event.detail.value);
		if (oldDisciplineName && oldDisciplineValue) {
			disciplineFreebieStore.setDiscipline(oldDisciplineName, oldDisciplineValue);
		}
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

	function updateDisciplinePower(
		discipline: PlayerDiscipline | undefined,
		event: CustomEvent<{
			name: NormalDisciplinePowerUnion | RitualDisciplinePowerUnion | undefined;
		}>
	) {
		if (!event.detail.name || !discipline) return;

		if (!discipline.powers.some((p) => p.name === event.detail.name)) {
			discipline = assignDisciplinePower(discipline, event.detail.name);
		} else if (event.detail.name) {
			discipline = removeDisciplinePower(discipline, event.detail.name);
		}
	}
</script>

<svelte:window bind:innerWidth />

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
	<div class="grid grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-3 sm:grid-rows-1">
		{#key $disciplineA?.powers || $disciplineB?.powers}
			{#if ($disciplineB?.powers?.length ?? 0) < 2}
				<EditableDiscipline
					disableDisciplinePowerSelection={disableDisciplinePowerSelectionForGhouls()}
					disableDots={true}
					discipline={$disciplineA}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					hideDotDisplay={true}
					label="Discipline A"
					showDisciplinePowerDeleteButton={true}
					showOnlyFirstPower={($disciplineB?.powers?.length ?? 0) >= 1}
					on:disciplineChange={adjustSelectionBox}
					on:disciplinePowerChange={(event) => updateDisciplinePower($disciplineA, event)}
				/>
			{/if}

			{#if $disciplineA && $disciplineA.powers.length < 2}
				<EditableDiscipline
					disableDisciplinePowerSelection={disableDisciplinePowerSelectionForGhouls()}
					disableDots={true}
					discipline={$disciplineB}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					hideDotDisplay={true}
					label="Discipline B"
					showDisciplinePowerDeleteButton={true}
					showOnlyFirstPower={$disciplineA.powers.length >= 1}
					on:disciplineChange={adjustSelectionBox}
					on:disciplinePowerChange={(event) => updateDisciplinePower($disciplineB, event)}
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
	<div class="grid grid-cols-1 grid-rows-3 gap-2 sm:grid-cols-3 sm:grid-rows-1">
		{#if $disciplineA?.name === 'Blood Sorcery'}
			<div class="flex flex-col gap-4">
				<EditableDiscipline
					disableDots={true}
					discipline={$disciplineA}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					{editModeEnabled}
					label="Discipline A"
					on:disciplineChange={adjustSelectionBox}
					on:disciplineValueChange={adjustDisciplineValue}
				/>
				<EditableBloodSorceryRitual
					enableEdit={editModeEnabled}
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
		{:else if $disciplineA?.name === 'Oblivion'}
			<div class="flex flex-col gap-4">
				<EditableDiscipline
					disableDots={true}
					discipline={$disciplineA}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1, 2]}
					{editModeEnabled}
					label="Discipline A"
					on:disciplineChange={adjustSelectionBox}
					on:disciplineValueChange={adjustDisciplineValue}
				/>
				<EditableOblivionCeremony
					enableEdit={editModeEnabled}
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
				discipline={$disciplineA}
				disciplines={getValidDisciplines(selectedClan, true)}
				dotList={[1, 2]}
				{editModeEnabled}
				initSelectedValue={2}
				label="Discipline A"
				on:disciplineChange={adjustSelectionBox}
			/>
		{/if}

		{#if $disciplineB?.name === 'Blood Sorcery'}
			<div class="flex flex-col gap-4">
				<EditableDiscipline
					disableDots={true}
					discipline={$disciplineB}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1]}
					{editModeEnabled}
					label="Discipline B"
					on:disciplineChange={adjustSelectionBox}
				/>
				<EditableBloodSorceryRitual
					enableEdit={editModeEnabled}
					existingBloodSorceryRituals={$characterCreationStore.rituals}
					lockFirstRitual={false}
					maxLevel={1}
					showDeleteButton={true}
					on:addRitualPower={(e) => addBloodSorceryRitualPowers(e)}
					on:changeRitualPower={(e) => updateBloodSorceryRitualPowers(e)}
					on:deleteRitualPower={(e) => deleteBloodSorceryRitualPowers(e)}
				/>
			</div>
		{:else if $disciplineB?.name === 'Oblivion'}
			<div class="flex flex-col gap-4">
				<EditableDiscipline
					disableDots={true}
					discipline={$disciplineB}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1]}
					{editModeEnabled}
					label="Discipline B"
					on:disciplineChange={adjustSelectionBox}
					on:disciplineValueChange={adjustDisciplineValue}
				/>
				<EditableOblivionCeremony
					enableEdit={editModeEnabled}
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
				discipline={$disciplineB}
				disciplines={getValidDisciplines(selectedClan, true)}
				dotList={[1]}
				{editModeEnabled}
				label="Discipline B"
				on:disciplineChange={adjustSelectionBox}
			/>
		{/if}

		{#if $disciplineC?.name === 'Blood Sorcery'}
			<div class="flex flex-col gap-4">
				<EditableDiscipline
					disableDots={true}
					discipline={$disciplineC}
					disciplines={getValidDisciplines(selectedClan)}
					dotList={[1]}
					{editModeEnabled}
					label="Discipline C"
					on:disciplineChange={adjustSelectionBox}
				/>
				<EditableBloodSorceryRitual
					enableEdit={editModeEnabled}
					existingBloodSorceryRituals={$characterCreationStore.rituals}
					lockFirstRitual={false}
					maxLevel={1}
					showDeleteButton={true}
					on:addRitualPower={(e) => addBloodSorceryRitualPowers(e)}
					on:changeRitualPower={(e) => updateBloodSorceryRitualPowers(e)}
					on:deleteRitualPower={(e) => deleteBloodSorceryRitualPowers(e)}
				/>
			</div>
		{:else if $disciplineC?.name === 'Oblivion'}
			<div class="flex flex-col gap-4">
				<EditableDiscipline
					disableDots={true}
					discipline={$disciplineC}
					disciplines={getValidDisciplines(selectedClan, true)}
					dotList={[1]}
					{editModeEnabled}
					label="Discipline C"
					on:disciplineChange={adjustSelectionBox}
					on:disciplineValueChange={adjustDisciplineValue}
				/>
				<EditableOblivionCeremony
					enableEdit={editModeEnabled}
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
				discipline={$disciplineC}
				disciplines={getValidDisciplines(selectedClan)}
				dotList={[1]}
				{editModeEnabled}
				label="Discipline C"
				on:disciplineChange={adjustSelectionBox}
			/>
		{/if}
	</div>
{/if}
