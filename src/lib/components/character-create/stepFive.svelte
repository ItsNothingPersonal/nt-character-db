<script lang="ts">
	import { typedObjectKeys } from '$lib/util';
	import { skillName, type SkillName } from '$lib/zod/enums/skillName';
	import { playerSkill } from '$lib/zod/playerCharacter/playerSkill';
	import { Step } from '@skeletonlabs/skeleton';
	import { characterCreateStore } from '../characterSheet/characterStore';
	import EditableRatingSelection from '../editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '../valueRating/valueRating.svelte';

	const validSkills = typedObjectKeys(skillName.Values);
	$: validRating = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	const hasSpecialization: SkillName[] = [
		'Academics',
		'Crafts',
		'Linguistics',
		'Lore',
		'Performance',
		'Science'
	];
	const baseUrl = 'https://vamp.bynightstudios.com/vampire/skills';

	$: locked = !playerSkill.array().length(10).safeParse($characterCreateStore.skills).success;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 5: Assign Initial Skills</svelte:fragment>
	<EditableRatingSelection
		label="Skill"
		propertyName="skills"
		configKey="Skill"
		validNames={validSkills}
		{validRating}
		bind:playerCharacter={$characterCreateStore}
	/>

	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		{#each $characterCreateStore.skills?.toSorted( (a, b) => a.name.localeCompare(b.name) ) ?? [] as skill}
			<ValueRating
				label={skill.name}
				value={skill.value}
				bind:specialization={skill.specialization}
				showInput={hasSpecialization.includes(skill.name)}
				href="{baseUrl}/{skill.name.toLowerCase()}"
			/>
		{/each}
	</div>
</Step>
