<script lang="ts">
	import type { PlayerTechnique } from '$lib/zod/playerCharacter/playerTechnique';

	export let techniques: PlayerTechnique[];

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/techniques';
</script>

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
>
	{#each techniques as technique}
		<a href="{baseUrl}/{technique.name.toLowerCase()}" class="underline decoration-dotted">
			<p>{technique.name}</p>
		</a>
	{/each}
</div>
