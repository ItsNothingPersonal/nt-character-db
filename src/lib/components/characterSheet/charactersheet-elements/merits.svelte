<script lang="ts">
	import Selectionbox from '$lib/components/selectionbox/selectionbox.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { addMerit, removeMerit } from '$lib/validation/mutations/merits';
	import { meritName, type MeritName } from '$lib/zod/enums/meritName';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
	const validMerits = typedObjectKeys(meritName.Values);

	let selectedMerit: MeritName;
</script>

{#if $interactiveModeStore}
	<div class="grid grid-cols-3">
		<Selectionbox
			label="Merit"
			selectableValues={validMerits}
			bind:value={selectedMerit}
			addButton={{
				onClick: () => characterStore.set(addMerit($characterStore, selectedMerit)),
				disabled: !isNullOrUndefined($characterStore.merits?.find((e) => e.name === selectedMerit))
			}}
			removeButton={{
				onClick: () => characterStore.set(removeMerit($characterStore, selectedMerit)),
				disabled: $characterStore.merits
					? $characterStore.merits.length === 0 ||
						isNullOrUndefined($characterStore.merits.find((e) => e.name === selectedMerit))
					: true
			}}
		/>
	</div>
{/if}

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each $characterStore.merits ?? [] as merit}
		<a href="{baseUrl}/{merit.name.toLowerCase()}" class="underline decoration-dotted">
			<p>{merit.name}</p>
		</a>
	{/each}
</div>
