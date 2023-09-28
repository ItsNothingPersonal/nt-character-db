<script lang="ts">
	import StepFive from '$lib/components/character-create/stepFive.svelte';
	import StepFour from '$lib/components/character-create/stepFour.svelte';
	import StepOne from '$lib/components/character-create/stepOne.svelte';
	import StepThree from '$lib/components/character-create/stepThree.svelte';
	import StepTwo from '$lib/components/character-create/stepTwo.svelte';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { playerCharacterBaseCreate } from '$lib/zod/playerCharacter/playerCharacterBase';
	import { Stepper } from '@skeletonlabs/skeleton';

	let playerCharacter: PlayerCharacterCreate = playerCharacterBaseCreate.parse({});
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
	<StepFive bind:playerCharacter />
</Stepper>
