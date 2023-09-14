<script lang="ts">
	import type { PlayerBackground } from '$lib/zod/playerBackground';
	import { Heading } from 'flowbite-svelte';
	import TextWithValue from './textWithValue.svelte';

	export let backgrounds: PlayerBackground[];

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/backgrounds';
</script>

<div class="mt-2">
	<Heading tag="h2" class="break-words">Backgrounds</Heading>
	<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-3">
		{#each backgrounds as background}
			<TextWithValue
				name={background.name}
				value={background.value}
				href="{baseUrl}/{background.name.toLowerCase()}"
			/>
		{/each}
	</div>
</div>
