<script lang="ts">
	import type { PlayerItem } from '$lib/zod/playerItem';
	import ValueNumber from './valueNumber/valueNumber.svelte';

	export let items: PlayerItem[] | undefined;
</script>

{#if items && items.length > 0}
	<div class="mt-2">
		<h2 class="h2">Items</h2>

		<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-8">
			{#each items as item}
				<ValueNumber label={item.name} specialization={item.qualities} />
			{/each}
		</div>
	</div>
{/if}
