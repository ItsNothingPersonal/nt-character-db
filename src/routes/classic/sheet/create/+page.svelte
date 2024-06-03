<script lang="ts">
	import StepEight from '$lib/components/classic/character-create/stepEight.svelte';
	import StepFive from '$lib/components/classic/character-create/stepFive.svelte';
	import StepFour from '$lib/components/classic/character-create/stepFour.svelte';
	import StepNine from '$lib/components/classic/character-create/stepNine.svelte';
	import StepOne from '$lib/components/classic/character-create/stepOne.svelte';
	import StepSeven from '$lib/components/classic/character-create/stepSeven.svelte';
	import StepSix from '$lib/components/classic/character-create/stepSix.svelte';
	import StepThree from '$lib/components/classic/character-create/stepThree.svelte';
	import StepTwo from '$lib/components/classic/character-create/stepTwo.svelte';
	import { characterStore } from '$lib/components/classic/characterSheet/characterStore';
	import { Stepper } from '@skeletonlabs/skeleton';

	function onCompleteHandler(): void {
		console.warn(JSON.stringify($characterStore, undefined, 2));
	}
</script>

<Stepper
	buttonBack="variant-ghost rounded-none"
	buttonComplete="variant-filled-primary rounded-none"
	buttonNext="variant-filled rounded-none"
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
