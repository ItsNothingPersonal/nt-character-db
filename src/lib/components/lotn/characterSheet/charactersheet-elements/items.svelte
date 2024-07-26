<script lang="ts">
	import type { PlayerItem } from '$lib/zod/lotn/playerCharacter/playerItem';
	import { getItemQualityDescription } from '../../util/itemUtil';
	import HelpText from '../components/HelpText.svelte';

	export let items: PlayerItem[];
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
	{#each items as item}
		<label
			class="card label grid h-full w-full auto-rows-auto grid-cols-1 rounded-sm p-4"
			for={item.name}
		>
			<span id={item.name} class="font-bold">{item.name}</span>
			{#if getItemQualityDescription(item.quality, item.type)}
				<HelpText id={item.name}>
					<span class="text-sm">{item.quality}</span>
					<svelte:fragment slot="helpText">
						<p class="whitespace-pre-line">
							{getItemQualityDescription(item.quality, item.type)}
						</p>
					</svelte:fragment>
				</HelpText>
			{:else}
				<p class="text-sm">{item.quality}</p>
			{/if}
		</label>
	{/each}
</div>
