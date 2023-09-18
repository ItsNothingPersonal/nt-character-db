<script lang="ts">
	import type { PlayerDiscipline } from '$lib/zod/playerDiscipline';
	import ValueRating from './valueRating/valueRating.svelte';

	export let disciplines: PlayerDiscipline[];

	let incCanDisciplines = disciplines.filter((e) => e.inclan === true);
	let outOfClanDisciplines = disciplines.filter((e) => e.inclan === false);

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';
</script>

<div class="mt-2">
	{#if incCanDisciplines.length > 0}
		<h2 class="h2">In-Clan Disciplines</h2>
		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-8">
			{#each incCanDisciplines as discipline}
				<ValueRating
					label={discipline.name}
					value={discipline.value}
					href="{baseUrl}/{discipline.name.toLowerCase()}"
				/>
			{/each}
		</div>
	{/if}

	{#if outOfClanDisciplines.length > 0}
		<h2 class="h2">Out-Of-Clan Disciplines</h2>
		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-8">
			{#each outOfClanDisciplines as discipline}
				<ValueRating
					label={discipline.name}
					value={discipline.value}
					href="{baseUrl}/{discipline.name.toLowerCase()}"
				/>
			{/each}
		</div>
	{/if}
</div>
