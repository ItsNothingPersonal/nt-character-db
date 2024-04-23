<script lang="ts">
	import { playerExperience } from '$lib/zod/playerCharacter/playerExperience';
	import { Step } from '@skeletonlabs/skeleton';
	import { characterCreateStore } from '../characterSheet/characterStore';
	import LabelledInput from '../labelledInput/labelledInput.svelte';

	$characterCreateStore.experience = [
		{ type: 'add', date: new Date(), reason: 'Initial Experience Bonus', value: 0 }
	];

	let value = 0;

	$: locked = !playerExperience.array().safeParse($characterCreateStore.experience).success;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 2: Record Initial XP</svelte:fragment>

	<LabelledInput
		label="Start Experience"
		bind:value
		onChange={() => {
			if ($characterCreateStore.experience) {
				$characterCreateStore.experience[0].value = value;
			}
		}}
	/>
</Step>
