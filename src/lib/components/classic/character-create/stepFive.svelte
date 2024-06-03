<script lang="ts">
	import { characterCreateStore } from '$lib/components/classic/characterSheet/characterStore';
	import EditableRatingSelection from '$lib/components/editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { typedObjectKeys } from '$lib/util';
	import { skillName, type SkillName } from '$lib/zod/classic/enums/skillName';
	import { playerSkill } from '$lib/zod/classic/playerCharacter/playerSkill';
	import { Step } from '@skeletonlabs/skeleton';

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
		configKey="Skill"
		label="Skill"
		propertyName="skills"
		validNames={validSkills}
		{validRating}
		bind:playerCharacter={$characterCreateStore}
	/>

	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		{#each $characterCreateStore.skills?.toSorted( (a, b) => a.name.localeCompare(b.name) ) ?? [] as skill}
			<ValueRating
				href="{baseUrl}/{skill.name.toLowerCase()}"
				label={skill.name}
				showInput={hasSpecialization.includes(skill.name)}
				value={skill.value}
				bind:specialization={skill.specialization}
			/>
		{/each}
	</div>
</Step>
