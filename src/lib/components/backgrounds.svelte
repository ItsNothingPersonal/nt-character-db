<script lang="ts">
	import type { PlayerBackground } from '$lib/zod/playerCharacter/playerBackground';
	import ValueRating from './valueRating/valueRating.svelte';

	export let backgrounds: PlayerBackground[];

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/backgrounds';
</script>

<div
	class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each backgrounds as background}
		<ValueRating
			label={background.name}
			value={background.value}
			specialization={background.specialization}
			href="{baseUrl}/{background.name.toLowerCase()}{background.name === 'Rituals'
				? ' (sabbat only)'
				: ''}"
		/>
	{/each}
</div>
