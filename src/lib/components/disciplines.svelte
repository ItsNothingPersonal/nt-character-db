<script lang="ts">
	import type { PlayerDiscipline } from '$lib/zod/playerDiscipline';
	import ValueRating from './valueRating/valueRating.svelte';

	export let disciplines: PlayerDiscipline[];

	let incCanDisciplines = disciplines.filter((e) => e.inclan === true);
	let outOfClanDisciplines = disciplines.filter((e) => e.inclan === false);

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/disciplines';
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col">
		<h3 class="h3">In-Clan Disciplines</h3>
		<div
			class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6"
		>
			{#each incCanDisciplines as discipline}
				<ValueRating
					label={discipline.name}
					value={discipline.value}
					href="{baseUrl}/{discipline.name.toLowerCase()}"
				/>
			{/each}
		</div>
	</div>

	{#if outOfClanDisciplines.length > 0}
		<div class="flex flex-col">
			<h3 class="h3">Out-Of-Clan Disciplines</h3>
			<div
				class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6"
			>
				{#each outOfClanDisciplines as discipline}
					<ValueRating
						label={discipline.name}
						value={discipline.value}
						href="{baseUrl}/{discipline.name.toLowerCase()}"
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
