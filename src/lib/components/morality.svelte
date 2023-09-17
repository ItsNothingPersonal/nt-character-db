<script lang="ts">
	import type { PlayerMorality } from '$lib/zod/playerMorality';
	import { A, Heading, P } from 'flowbite-svelte';

	export let morality: PlayerMorality;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

<div class="mt-2">
	<Heading tag="h2">Morality</Heading>

	<div class="grid-cols-min-content-2 grid grid-rows-1 items-center gap-4 whitespace-nowrap">
		<A href="{baseUrl}/{morality.name.toLowerCase()}">
			<P color="text-red-700 dark:text-red-500" weight="bold">{morality.name}</P>
		</A>
		<P size="2xl">{morality.value}</P>
	</div>
</div>
