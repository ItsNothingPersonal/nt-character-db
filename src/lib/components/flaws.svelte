<script lang="ts">
	import type { PlayerFlaw } from '$lib/zod/playerCharacter/playerFlaw';

	export let flaws: PlayerFlaw[];

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/flaws';
</script>

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each flaws as flaw}
		<a href="{baseUrl}/{flaw.name.toLowerCase()}" class="underline decoration-dotted">
			<p>{flaw.name}</p>
		</a>
	{/each}
</div>
