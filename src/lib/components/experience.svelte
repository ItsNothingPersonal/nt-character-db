<script lang="ts">
	import { isNullOrUndefined } from '$lib/util';
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
</script>

{#if !isNullOrUndefined(gained) && !isNullOrUndefined(spent)}
	<div class="mt-2">
		<Heading tag="h2">Experience</Heading>
		<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-4">
			<TextWithValue name="Start" value={30} />
			<TextWithValue name="Gained" value={gained} />
			<TextWithValue name="Spent" value={spent} />
			<TextWithValue name="Left" value={30 + gained - spent} />
		</div>
	</div>
{/if}
