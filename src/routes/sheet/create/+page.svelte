<script lang="ts">
	import StepFour from '$lib/components/character-create/stepFour.svelte';
	import StepOne from '$lib/components/character-create/stepOne.svelte';
	import StepThree from '$lib/components/character-create/stepThree.svelte';
	import StepTwo from '$lib/components/character-create/stepTwo.svelte';
	import type { PlayerCharacter } from '$lib/zod/playerCharacter/playerCharacter';
	import { Stepper } from '@skeletonlabs/skeleton';

	let playerCharacter: Partial<PlayerCharacter> = {
		attributes: {
			physical_value: 0,
			physical_specialization: ['Strength'],
			social_value: 0,
			social_specialization: ['Appearance'],
			mental_value: 0,
			mental_specialization: ['Intelligence']
		},
		experience: [{ date: new Date(), reason: 'Initial Bonus Exp', type: 'add', value: 0 }],
		disciplines: []
	};
</script>

<p>{JSON.stringify(playerCharacter)}</p>
<Stepper
	buttonNext="variant-filled rounded-none"
	buttonBack="variant-ghost rounded-none"
	buttonComplete="variant-filled-primary rounded-none"
>
	<StepOne bind:playerCharacter />
	<StepTwo bind:playerCharacter />
	<StepThree bind:playerCharacter />
	<StepFour bind:playerCharacter />
</Stepper>
