<script lang="ts">
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { skillName, type SkillName } from '$lib/zod/enums/skillName';
	import type { PlayerCharacterCreate } from '$lib/zod/playerCharacter/playerCharacter';
	import { Step } from '@skeletonlabs/skeleton';
	import ValueRating from '../valueRating/valueRating.svelte';

	export let playerCharacter: PlayerCharacterCreate;

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
	let selectedSkill: SkillName;
	let selectedValue: number;

	function addButton(skillName: SkillName, skillValue: number) {
		playerCharacter.skills = [
			...(playerCharacter.skills ?? []),
			{ name: skillName, value: skillValue }
		];

		[validRating.find((e) => e === skillValue)].filter((x) => x !== undefined);

		const indexRating = validRating.findIndex((e) => e === skillValue);
		validRating = validRating.filter((_, i) => i !== indexRating);
	}

	function removeButton(skillName: SkillName) {
		if (playerCharacter.skills) {
			const skillToBeRemoved = playerCharacter.skills?.find((e) => e.name === skillName);

			if (skillToBeRemoved) {
				playerCharacter.skills = playerCharacter.skills.filter((e) => e.name !== skillName);
				validRating = [...validRating, skillToBeRemoved.value].toSorted((a, b) => b - a);
			}
		}
	}

	$: locked = playerCharacter.skills ? playerCharacter.skills?.length !== 10 : true;
</script>

<Step {locked}>
	<svelte:fragment slot="header">Step 5: Assign Initial Skills</svelte:fragment>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		<label>
			Skill
			<select class="select rounded-none" bind:value={selectedSkill}>
				{#each validSkills as entry}
					<option value={entry}>{entry}</option>
				{/each}
			</select>
		</label>
		<label>
			Rating
			<select
				class="select rounded-none"
				bind:value={selectedValue}
				disabled={validRating.length === 0}
			>
				{#each validRating as entry}
					<option value={entry}>{entry}</option>
				{/each}
			</select>
		</label>
	</div>
	<button
		type="button"
		class="variant-filled btn rounded-none"
		on:click={() => addButton(selectedSkill, selectedValue)}
		disabled={validRating.length === 0 ||
			!isNullOrUndefined(playerCharacter.skills?.find((e) => e.name === selectedSkill))}
	>
		Add Skill
	</button>
	<button
		type="button"
		class="variant-filled btn rounded-none"
		on:click={() => removeButton(selectedSkill)}
		disabled={playerCharacter.skills
			? playerCharacter.skills.length === 0 ||
			  isNullOrUndefined(playerCharacter.skills.find((e) => e.name === selectedSkill))
			: true}
	>
		Remove Skill
	</button>
	<div class="grid auto-rows-auto grid-cols-3 gap-2">
		{#each playerCharacter.skills ?? [] as skill}
			{#if hasSpecialization.includes(skill.name)}
				<ValueRating
					label={skill.name}
					value={skill.value}
					bind:specialization={skill.specialization}
					showInput={true}
				/>
			{:else}
				<ValueRating label={skill.name} value={skill.value} />
			{/if}
		{/each}
	</div>
</Step>
