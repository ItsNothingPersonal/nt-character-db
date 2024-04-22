<script lang="ts">
	import StepEight from '$lib/components/character-create/stepEight.svelte';
	import StepFive from '$lib/components/character-create/stepFive.svelte';
	import StepFour from '$lib/components/character-create/stepFour.svelte';
	import StepNine from '$lib/components/character-create/stepNine.svelte';
	import StepOne from '$lib/components/character-create/stepOne.svelte';
	import StepSeven from '$lib/components/character-create/stepSeven.svelte';
	import StepSix from '$lib/components/character-create/stepSix.svelte';
	import StepThree from '$lib/components/character-create/stepThree.svelte';
	import StepTwo from '$lib/components/character-create/stepTwo.svelte';
	import { characterStore } from '$lib/components/characterSheet/characterStore';
	import { Stepper } from '@skeletonlabs/skeleton';

	function onCompleteHandler(): void {
		console.warn(JSON.stringify($characterStore, undefined, 2));
	}
</script>

<Stepper
	buttonNext="variant-filled rounded-none"
	buttonBack="variant-ghost rounded-none"
	buttonComplete="variant-filled-primary rounded-none"
	on:complete={onCompleteHandler}
>
	<StepOne />
	<StepTwo />
	<StepThree />
	<StepFour />
	<StepFive />
	<StepSix />
	<StepSeven />
	<StepEight />
	<StepNine />
</Stepper>
