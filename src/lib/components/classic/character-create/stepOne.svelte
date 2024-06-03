<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import Selectionbox from '$lib/components/selectionbox/selectionbox.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { archetypeName } from '$lib/zod/classic/enums/archetypeName';
	import { Step } from '@skeletonlabs/skeleton';

	const validArchetypes = typedObjectKeys(archetypeName.Values);

	$: locked =
		isNullOrUndefined($characterCreateStore.name) ||
		$characterCreateStore.name.trim().length <= 0 ||
		isNullOrUndefined($characterCreateStore.archetype);
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 1: Inspiration</svelte:fragment>
	<label>
		Name
		<input
			id="name"
			class="input variant-form-material"
			type="text"
			bind:value={$characterCreateStore.name}
		/>
	</label>

	<Selectionbox
		label="Archetype"
		selectableValues={validArchetypes}
		bind:value={$characterCreateStore.archetype}
	/>
</Step>
