<script lang="ts">
	import type { PlayerFlaw } from '$lib/zod/playerFlaw';
	import { A, Heading, P } from 'flowbite-svelte';

	export let flaws: PlayerFlaw[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/flaws';
</script>

{#if flaws && flaws.length > 0}
	<div class="mt-2">
		<Heading tag="h2">Flaws</Heading>
		<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-3">
			{#each flaws as flaw}
				<A href="{baseUrl}/{flaw.name.toLowerCase()}">
					<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{flaw.name}</P>
				</A>
			{/each}
		</div>
	</div>
{/if}
