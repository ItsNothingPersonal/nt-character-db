<script lang="ts">
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { playerExperience } from '$lib/zod/playerCharacter/playerExperience';
	import { Step } from '@skeletonlabs/skeleton';

	export let playerCharacter: PlayerCharacterCreate;

	playerCharacter.experience = [
		{ type: 'add', date: new Date(), reason: 'Initial Experience Bonus', value: 0 }
	];

	let value = 0;

	$: locked = !playerExperience.array().safeParse(playerCharacter.experience).success;
</script>

<Step {locked}>
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
