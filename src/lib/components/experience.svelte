<script lang="ts">
	import type { PlayerExperience } from '$lib/zod/playerExperience';
	import ValueNumber from './valueNumber/valueNumber.svelte';

	export let experience: PlayerExperience[] | undefined;

	$: gained = experience
		?.filter((e) => e.type === 'add')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: spent = experience
		?.filter((e) => e.type === 'substract')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: left = 40 + (gained ?? 0) - (spent ?? 0);
</script>

<div class="mt-6">
	<h2 class="h2">Experience</h2>

	<div
		class="mt-1 grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
	>
		<ValueNumber label="Start" value={40} />
		<ValueNumber label="Gained" value={gained} />
		<ValueNumber label="Spent" value={spent} />
		<ValueNumber label="Remaining" value={left} />
	</div>
</div>
