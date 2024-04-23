<script lang="ts">
	import EditableRatingSelection from '$lib/components/editableRatingSelection/editableRatingSelection.svelte';
	import { typedObjectKeys } from '$lib/util';
	import { techniqueName } from '$lib/zod/enums/techniqueName';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/techniques';
</script>

{#if $interactiveModeStore}
	<EditableRatingSelection
		label="Technique"
		propertyName="techniques"
		configKey="Technique"
		validNames={typedObjectKeys(techniqueName.Values)}
		bind:playerCharacter={$characterStore}
		calculateCost={true}
		uniqueEntries={true}
		showRating={false}
	/>
{/if}
<div
	class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
>
	{#each $characterStore.techniques ?? [] as technique}
		<a href="{baseUrl}/{technique.name.toLowerCase()}" class="underline decoration-dotted">
			<p>{technique.name}</p>
		</a>
	{/each}
</div>
