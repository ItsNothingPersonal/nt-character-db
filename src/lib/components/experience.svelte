<script lang="ts">
	import type { PlayerExperience } from '$lib/zod/playerExperience';
	import { Heading } from 'flowbite-svelte';
	import TextWithValue from './textWithValue.svelte';

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

<div class="mt-2">
	<Heading tag="h2">Experience</Heading>
	<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-4">
		<TextWithValue name="Start" value={40} />
		<TextWithValue name="Gained" value={gained} />
		<TextWithValue name="Spent" value={spent} />
		<TextWithValue name="Remaining" value={left} />
	</div>
</div>
