<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { archetypeName } from '$lib/zod/enums/archetypeName';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';

	export let playerCharacter: PlayerCharacterCreate;
	const validArchetypes = typedObjectKeys(archetypeName.Values);

	$: locked =
		isNullOrUndefined(playerCharacter.name) ||
		playerCharacter.name.trim().length <= 0 ||
		isNullOrUndefined(playerCharacter.archetype);
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 1: Inspiration</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-1">
		<label>
			Name
			<input type="text" class="input variant-form-material" bind:value={playerCharacter.name} />
		</label>
		<label>
			Archetype
			<select class="select rounded-none" bind:value={playerCharacter.archetype}>
				{#each validArchetypes as entry}
					<option value={entry}>{entry}</option>
				{/each}
			</select>
		</label>
	</div>
</Step>
