<script lang="ts">
	import type { PlayerItem } from '$lib/zod/playerCharacter/playerItem';
	import ValueNumber from './valueNumber/valueNumber.svelte';

	export let items: PlayerItem[];
</script>

<div
	class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each items as item}
		<ValueNumber label={item.name} specialization={item.qualities} />
	{/each}
</div>
