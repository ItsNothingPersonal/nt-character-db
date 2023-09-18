<script lang="ts">
	import type { PlayerFlaw } from '$lib/zod/playerFlaw';

	export let flaws: PlayerFlaw[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/flaws';
</script>

{#if flaws && flaws.length > 0}
	<div class="mt-2">
		<h2 class="h2">Flaws</h2>
		<div class="grid auto-rows-auto grid-cols-5 gap-2">
			{#each flaws as flaw}
				<a href="{baseUrl}/{flaw.name.toLowerCase()}">
					<p>{flaw.name}</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
