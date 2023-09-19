<script lang="ts">
	import type { PlayerFlaw } from '$lib/zod/playerFlaw';

	export let flaws: PlayerFlaw[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/flaws';
</script>

{#if flaws && flaws.length > 0}
	<div class="mt-6">
		<h2 class="h2">Flaws</h2>
		<div
			class="mt-1 grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
		>
			{#each flaws as flaw}
				<a href="{baseUrl}/{flaw.name.toLowerCase()}" class="underline decoration-dotted">
					<p>{flaw.name}</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
