<script lang="ts">
	import type { PlayerMerit } from '$lib/zod/playerMerit';
	import { A, Heading, P } from 'flowbite-svelte';

	export let merits: PlayerMerit[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

{#if merits && merits.length > 0}
	<div class="mt-2">
		<Heading tag="h2">Merits</Heading>
		<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-3">
			{#each merits as merit}
				<A href="{baseUrl}/{merit.name.toLowerCase()}">
					<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{merit.name}</P>
				</A>
			{/each}
		</div>
	</div>
{/if}
