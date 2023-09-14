<script lang="ts">
	import type { PlayerTechnique } from '$lib/zod/playerTechnique';
	import { A, Heading, P } from 'flowbite-svelte';

	export let techniques: PlayerTechnique[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/techniques';
</script>

{#if techniques && techniques.length > 0}
	<div class="mt-2">
		<Heading tag="h2">Techniques</Heading>
		<div class="grid auto-rows-auto grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
			{#each techniques as technique}
				<A href="{baseUrl}/{technique.name.toLowerCase()}">
					<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{technique.name}</P>
				</A>
			{/each}
		</div>
	</div>
{/if}
