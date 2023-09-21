<script lang="ts">
	import type { PlayerItem } from '$lib/zod/playerCharacter/playerItem';

	export let label: string;
	export let items: { name: string }[];

	export let value: PlayerItem | { name: string } | undefined;
</script>

<label class="mt-2 flex flex-col gap-2">
	<p class="whitespace-nowrap">{label}</p>
	<select class="select rounded-none capitalize" bind:value disabled={items.length === 0}>
		<option value={undefined}>None</option>
		{#each items as item}
			<option class="capitalize" value={item}>{item.name}</option>
		{/each}
	</select>
</label>
