<script lang="ts">
	import { isInClan } from '../../util/disciplines';
	import { characterStore } from '../characterStore';
	import Discipline from '../components/Discipline.svelte';

	const changedDisciplines = new Map<string, number>();
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col">
		<h3 class="h3 mb-2">In-Clan Disciplines</h3>
		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
			{#each $characterStore.disciplines.filter( (e) => isInClan($characterStore.clan, e.name) ) as discipline}
				<Discipline
					{discipline}
					start={changedDisciplines.get(discipline.name)}
					bind:value={discipline.value}
				/>
			{/each}
		</div>
	</div>

	{#if $characterStore.disciplines.filter((e) => !isInClan($characterStore.clan, e.name)).length > 0}
		<div class="flex flex-col">
			<h3 class="h3 mb-2">Out-Of-Clan Disciplines</h3>
			<div
				class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5"
			>
				{#each $characterStore.disciplines.filter((e) => !isInClan($characterStore.clan, e.name)) as discipline}
					<Discipline
						{discipline}
						start={changedDisciplines.get(discipline.name)}
						bind:value={discipline.value}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
