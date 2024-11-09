<script lang="ts">
	import ValueNumber from '$lib/components/valueNumber/valueNumber.svelte';
	import type { PlayerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience';
	export let experience: PlayerExperience[];

	$: gained = experience
		.filter((e) => e.type === 'add')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: spent = experience
		.filter((e) => e.type === 'substract')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: left = 20 + gained - spent;
</script>

<div class="mb-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
	<ValueNumber label="Start" value={20} />
	<ValueNumber label="Gained" value={gained} />
	<ValueNumber label="Spent" value={spent} />
	<ValueNumber label="Remaining" value={left} />
</div>
