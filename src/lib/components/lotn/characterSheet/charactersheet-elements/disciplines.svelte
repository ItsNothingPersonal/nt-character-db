<script lang="ts">
	import { isInClan } from '../../util/clanUtil';
	import { characterStore } from '../characterStore';
	import Discipline from '../components/Discipline.svelte';

	const changedDisciplines = new Map<string, number>();

	function handleChangeInClan(
		event: CustomEvent<{ label: string; old: number; new: number }>
	): void {
		console.warn('tbd' + event.detail.label);
	}

	function handleChangeOutOfClan(
		event: CustomEvent<{ label: string; old: number; new: number }>
	): void {
		console.warn('tbd' + event.detail.label);
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col">
		<h3 class="h3 mb-2">In-Clan Disciplines</h3>
		<div class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
			{#each $characterStore.disciplines.filter( (e) => isInClan($characterStore.clan, e.name) ) as discipline}
				<Discipline
					{discipline}
					start={changedDisciplines.get(discipline.name)}
					bind:value={discipline.value}
					on:change={handleChangeInClan}
				/>
			{/each}
		</div>
	</div>

	{#if $characterStore.disciplines.filter((e) => !isInClan($characterStore.clan, e.name)).length > 0}
		<div class="flex flex-col">
			<h3 class="h3 mb-2">Out-Of-Clan Disciplines</h3>
			<div
				class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5"
			>
				{#each $characterStore.disciplines.filter((e) => !isInClan($characterStore.clan, e.name)) as discipline}
					<Discipline
						{discipline}
						start={changedDisciplines.get(discipline.name)}
						bind:value={discipline.value}
						on:change={handleChangeOutOfClan}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
