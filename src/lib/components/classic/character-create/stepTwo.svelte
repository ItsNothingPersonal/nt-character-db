<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import LabelledInput from '$lib/components/labelledInput/labelledInput.svelte';
	import { playerExperience } from '$lib/zod/classic/playerCharacter/playerExperience';
	import { Step } from '@skeletonlabs/skeleton';

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
		onChange={() => {
			if ($characterCreateStore.experience) {
				$characterCreateStore.experience[0].value = value;
			}
		}}
		bind:value
	/>
</Step>
