<script lang="ts">
	import type { PlayerTechnique } from '$lib/zod/playerTechnique';

	export let techniques: PlayerTechnique[] | undefined;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/techniques';
</script>

{#if techniques && techniques.length > 0}
	<div class="mt-2">
		<h2 class="h2">Techniques</h2>

		<div
			class="mt-1 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
		>
			{#each techniques as technique}
				<a href="{baseUrl}/{technique.name.toLowerCase()}">
					<p>{technique.name}</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
