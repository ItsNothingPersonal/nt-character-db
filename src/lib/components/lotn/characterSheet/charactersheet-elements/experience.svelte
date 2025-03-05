<script lang="ts">
	import type { PlayerExperience } from '$lib/zod/lotn/playerCharacter/playerExperience';
	import { get } from 'svelte/store';
	import { getProjectStartExp } from '../../util/experienceUtils';
	import { characterStore } from '../characterStore';
	import LabelWithHelpText from '../components/LabelWithHelpText.svelte';
	export let experience: PlayerExperience[];

	$: gained = experience
		.filter((e) => e.type === 'add')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: spent = experience
		.filter((e) => e.type === 'substract')
		.map((e) => e.value)
		.reduce((p, c) => p + c, 0);
	$: left = getProjectStartExp(get(characterStore).project) + gained - spent;
</script>

<div class="mb-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
	<LabelWithHelpText
		id="experience"
		helpText="You gain 20 experience points at the start of the game."
		label="Start"
		text={getProjectStartExp(get(characterStore).project)}
	/>
	<LabelWithHelpText
		id="gained"
		helpText="This is the total amount of experience you have gained."
		label="Gained"
		text={gained}
	/>
	<LabelWithHelpText
		id="spent"
		helpText="This is the total amount of experience you have spent."
		label="Spent"
		text={spent}
	/>
	<LabelWithHelpText
		id="remaining"
		helpText="This is the amount of experience you have left to spend."
		label="Remaining"
		text={left}
	/>
</div>
