<script lang="ts">
	import type { PlayerItem } from '$lib/zod/playerItem';
	import ValueNumber from './valueNumber/valueNumber.svelte';

	export let items: PlayerItem[] | undefined;
</script>

{#if items && items.length > 0}
	<div class="mt-6">
		<h2 class="h2">Items</h2>

		<div
			class="mt-1 grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
		>
			{#each items as item}
				<ValueNumber label={item.name} specialization={item.qualities} />
			{/each}
		</div>
	</div>
{/if}
