<script lang="ts">
	import Selectionbox from '$lib/components/selectionbox/selectionbox.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { addFlaw, removeFlaw } from '$lib/validation/mutations/flaws';
	import { flawName, type FlawName } from '$lib/zod/enums/flawName';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/flaws';
	const validFlaws = typedObjectKeys(flawName.Values);

	let selectedFlaw: FlawName;
</script>

{#if $interactiveModeStore}
	<div class="grid grid-cols-3">
		<Selectionbox
			label="Flaw"
			selectableValues={validFlaws}
			bind:value={selectedFlaw}
			addButton={{
				onClick: () => characterStore.set(addFlaw($characterStore, selectedFlaw)),
				disabled: !isNullOrUndefined($characterStore.flaws?.find((e) => e.name === selectedFlaw))
			}}
			removeButton={{
				onClick: () => characterStore.set(removeFlaw($characterStore, selectedFlaw)),
				disabled: $characterStore.flaws
					? $characterStore.flaws.length === 0 ||
						isNullOrUndefined($characterStore.flaws.find((e) => e.name === selectedFlaw))
					: true
			}}
		/>
	</div>
{/if}

<div
	class="grid auto-rows-auto grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each $characterStore.flaws ?? [] as flaw}
		<a href="{baseUrl}/{flaw.name.toLowerCase()}" class="underline decoration-dotted">
			<p>{flaw.name}</p>
		</a>
	{/each}
</div>
