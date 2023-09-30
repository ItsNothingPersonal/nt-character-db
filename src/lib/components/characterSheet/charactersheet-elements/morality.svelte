<script lang="ts">
	import ValueNumber from '$lib/components/valueNumber/valueNumber.svelte';
	import type { PlayerMorality } from '$lib/zod/playerCharacter/playerMorality';

	export let morality: PlayerMorality;

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

<div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
	{#if morality.name === 'Humanity'}
		<ValueNumber label={morality.name} value={morality.value} />
	{:else}
		<ValueNumber label={morality.name} value={morality.value} href="{baseUrl}/{morality.name}" />
	{/if}
</div>
