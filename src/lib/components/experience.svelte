<script lang="ts">
	import type { PlayerExperience } from '$lib/zod/playerExperience';
	import ValueNumber from './valueNumber/valueNumber.svelte';

	export let experience: PlayerExperience[];

	$: gained = experience
		.filter((e) => e.type === 'add')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: spent = experience
		.filter((e) => e.type === 'substract')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: left = 40 + (gained ?? 0) - (spent ?? 0);
</script>

<div class="mb-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
	<ValueNumber label="Start" value={40} />
	<ValueNumber label="Gained" value={gained} />
	<ValueNumber label="Spent" value={spent} />
	<ValueNumber label="Remaining" value={left} />
</div>
