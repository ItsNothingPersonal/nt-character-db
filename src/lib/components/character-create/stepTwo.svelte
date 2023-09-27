<script lang="ts">
	import type { PlayerCharacter } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';

	export let playerCharacter: Partial<PlayerCharacter>;

	let value = 0;
</script>

<Step>
	<svelte:fragment slot="header">Step 2: Record Initial XP</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-1">
		<label>
			Start Experience
			<input
				type="number"
				class="input variant-form-material"
				bind:value
				on:change={() => {
					if (playerCharacter.experience) {
						playerCharacter.experience[0].value = value;
					}
				}}
			/>
		</label>
	</div>
</Step>
