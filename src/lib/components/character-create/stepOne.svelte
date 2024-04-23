<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { archetypeName } from '$lib/zod/enums/archetypeName';
	import { Step } from '@skeletonlabs/skeleton';
	import { characterCreateStore } from '../characterSheet/characterStore';
	import Selectionbox from '../selectionbox/selectionbox.svelte';

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
			type="text"
			class="input variant-form-material"
			bind:value={$characterCreateStore.name}
		/>
	</label>

	<Selectionbox
		label="Archetype"
		selectableValues={validArchetypes}
		bind:value={$characterCreateStore.archetype}
	/>
</Step>
