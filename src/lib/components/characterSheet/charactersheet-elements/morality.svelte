<script lang="ts">
	import ValueNumber from '$lib/components/valueNumber/valueNumber.svelte';
	import { characterStore } from '../characterStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
</script>

<div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
	{#if $characterStore.name === 'Humanity'}
		<ValueNumber label={$characterStore.morality.name} value={$characterStore.morality.value} />
	{:else}
		<ValueNumber
			label={$characterStore.morality.name}
			value={$characterStore.morality.value}
			href="{baseUrl}/{$characterStore.morality.name}"
		/>
	{/if}
</div>
