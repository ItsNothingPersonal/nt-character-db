<script lang="ts">
	import EditableRatingSelection from '$lib/components/editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { costConfig } from '$lib/validation/config/constConfig';
	import { disciplineName } from '$lib/zod/enums/disciplineName';
	import { get } from 'svelte/store';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';
	const changedDisciplines = new Map<string, number>();

	function handleChangeInClan(
		event: CustomEvent<{ label: string; old: number; new: number }>
	): void {
		const costConfigEntry = costConfig.get('InClanDiscipline');

		if (isNullOrUndefined(costConfigEntry)) {
			console.error('Config zum Steigern für In-Clan-Disziplinen fehlen!');
			return;
		}

		if (!changedDisciplines.has(event.detail.label)) {
			changedDisciplines.set(event.detail.label, event.detail.old);
		}

		$characterStore = costConfigEntry(
			get(characterStore),
			event.detail.label,
			event.detail.new > event.detail.old ? 'add' : 'remove',
			true,
			event.detail.old,
			event.detail.new
		);
	}

	function handleChangeOutOfClan(
		event: CustomEvent<{ label: string; old: number; new: number }>
	): void {
		const costConfigEntry = costConfig.get('OutOfClanDiscipline');

		if (isNullOrUndefined(costConfigEntry)) {
			console.error('Config zum Steigern für Out-Of-Clan-Disziplinen fehlen!');
			return;
		}

		if (!changedDisciplines.has(event.detail.label)) {
			changedDisciplines.set(event.detail.label, event.detail.old);
		}

		$characterStore = costConfigEntry(
			get(characterStore),
			event.detail.label,
			event.detail.new > event.detail.old ? 'add' : 'remove',
			true,
			event.detail.old,
			event.detail.new
		);
	}
</script>

{#if $interactiveModeStore}
	<EditableRatingSelection
		label="Discipline"
		propertyName="disciplines"
		configKey="OutOfClanDiscipline"
		validNames={typedObjectKeys(disciplineName.Values)}
		validRating={[1, 2, 3, 4, 5, 6, 7]}
		bind:playerCharacter={$characterStore}
		calculateCost={true}
		uniqueEntries={true}
	/>
{/if}
<div class="flex flex-col gap-2">
	<div class="flex flex-col">
		<h3 class="h3">In-Clan Disciplines</h3>
		<div
			class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6"
		>
			{#each $characterStore.disciplines.filter((e) => e.inclan === true) as discipline}
				<ValueRating
					label={discipline.name}
					bind:value={discipline.value}
					href="{baseUrl}/{discipline.name.toLowerCase()}"
					on:change={handleChangeInClan}
					start={changedDisciplines.get(discipline.name)}
				/>
			{/each}
		</div>
	</div>

	{#if $characterStore.disciplines.filter((e) => e.inclan !== true).length > 0}
		<div class="flex flex-col">
			<h3 class="h3">Out-Of-Clan Disciplines</h3>
			<div
				class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6"
			>
				{#each $characterStore.disciplines.filter((e) => e.inclan !== true) as discipline}
					<ValueRating
						label={discipline.name}
						bind:value={discipline.value}
						href="{baseUrl}/{discipline.name.toLowerCase()}"
						on:change={handleChangeOutOfClan}
						start={changedDisciplines.get(discipline.name)}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
