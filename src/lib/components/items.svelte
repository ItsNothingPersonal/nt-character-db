<script lang="ts">
	import type { PlayerItem } from '$lib/zod/playerItem';
	import { Heading } from 'flowbite-svelte';
	import TextWithValue from './textWithValue.svelte';

	export let items: PlayerItem[] | undefined;
</script>

{#if items && items.length > 0}
	<div class="mt-2">
		<Heading tag="h2" class="break-words">Items</Heading>

		{#each items as item}
			<TextWithValue name={item.name} specialization={item.qualities.join(', ')} />
		{/each}
	</div>
{/if}
