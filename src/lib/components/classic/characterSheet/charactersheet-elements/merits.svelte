<script lang="ts">
	import Selectionbox from '$lib/components/selectionbox/selectionbox.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { addMerit, removeMerit } from '$lib/validation/mutations/merits';
	import { meritName, type MeritName } from '$lib/zod/classic/enums/meritName';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/merits';
	const validMerits = typedObjectKeys(meritName.Values);

	let selectedMerit: MeritName;
</script>

{#if $interactiveModeStore}
	<div class="grid grid-cols-3">
		<Selectionbox
			addButton={{
				onClick: () => characterStore.set(addMerit($characterStore, selectedMerit)),
				disabled: !isNullOrUndefined($characterStore.merits?.find((e) => e.name === selectedMerit))
			}}
			label="Merit"
			removeButton={{
				onClick: () => characterStore.set(removeMerit($characterStore, selectedMerit)),
				disabled: $characterStore.merits
					? $characterStore.merits.length === 0 ||
						isNullOrUndefined($characterStore.merits.find((e) => e.name === selectedMerit))
					: true
			}}
			selectableValues={validMerits}
			bind:value={selectedMerit}
		/>
	</div>
{/if}

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each $characterStore.merits ?? [] as merit}
		<a class="underline decoration-dotted" href="{baseUrl}/{merit.name.toLowerCase()}">
			<p>{merit.name}</p>
		</a>
	{/each}
</div>
