<script lang="ts">
	import type { PlayerMorality } from '$lib/zod/playerMorality';
	import { Heading, P } from 'flowbite-svelte';

	export let morality: PlayerMorality;
</script>

<div class="mt-2">
	<Heading tag="h2">Morality</Heading>
	<div class="grid grid-cols-3 grid-rows-1">
		<div class="grid grid-cols-2 grid-rows-1 items-center gap-10">
			<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{morality.name}</P>
			<P size="2xl">{morality.value}</P>
		</div>
	</div>
</div>
