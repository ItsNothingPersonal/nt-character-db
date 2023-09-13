<script lang="ts">
	import type { PlayerDiscipline } from '$lib/zod/playerDiscipline';
	import { Heading } from 'flowbite-svelte';
	import Discipline from './discipline.svelte';

	export let disciplines: PlayerDiscipline[];

	let incCanDisciplines = disciplines.filter((e) => e.inclan === true);
	let outOfClanDisciplines = disciplines.filter((e) => e.inclan === false);
</script>

<div class="mt-2">
	{#if incCanDisciplines.length > 0}
		<Heading tag="h2">Clansdisziplinen</Heading>
		<div class="grid grid-cols-3 grid-rows-1">
			{#each incCanDisciplines as discipline}
				<Discipline name={discipline.name} disciplineValue={discipline.value} />
			{/each}
		</div>
	{/if}

	{#if outOfClanDisciplines.length > 0}
		<Heading tag="h2">Fremddisziplinen</Heading>
		<div class="grid grid-cols-3 grid-rows-1">
			{#each outOfClanDisciplines as discipline}
				<Discipline name={discipline.name} disciplineValue={discipline.value} />
			{/each}
		</div>
	{/if}
</div>
