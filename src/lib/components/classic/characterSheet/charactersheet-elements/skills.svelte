<!--
<script lang="ts">
	import EditableRatingSelection from '$lib/components/editableRatingSelection/editableRatingSelection.svelte';
	import ValueRating from '$lib/components/valueRating/valueRating.svelte';
	import { isNullOrUndefined, typedObjectKeys } from '$lib/util';
	import { costConfig } from '$lib/validation/config/constConfig';
	import { skillName } from '$lib/zod/classic/enums/skillName';
	import { get } from 'svelte/store';
	import { characterStore } from '../characterStore';
	import { interactiveModeStore } from '../interactiveModeStore';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/skills';
	const changedSkills = new Map<string, number>();
	const validSkills = typedObjectKeys(skillName.Values);
	const validRating = [1, 2, 3, 4, 5, 6, 7];

	function handleChange(event: CustomEvent<{ label: string; old: number; new: number }>): void {
		const costConfigEntry = costConfig.get('Skill');

		if (isNullOrUndefined(costConfigEntry)) {
			console.error('Config zum Steigern für Skills fehlt!');
			return;
		}

		if (!changedSkills.has(event.detail.label)) {
			changedSkills.set(event.detail.label, event.detail.old);
		}

		$characterStore = costConfigEntry(
			get(characterStore),
			event.detail.label,
			event.detail.new > event.detail.old ? 'add' : 'remove',
			true,
			event.detail.old,
			event.detail.new
		);
	}
</script>

{#if $interactiveModeStore}
	<EditableRatingSelection
		calculateCost={true}
		configKey="Skill"
		label="Skill"
		propertyName="skills"
		validNames={validSkills}
		{validRating}
		bind:playerCharacter={$characterStore}
	/>
{/if}
<div
	class="grid auto-rows-auto grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each $characterStore.skills as skill}
		<ValueRating
			href="{baseUrl}/{skill.name.toLowerCase()}"
			label={skill.name}
			specialization={skill.specialization}
			start={changedSkills.get(skill.name)}
			bind:value={skill.value}
			on:change={handleChange}
		/>
	{/each}
</div>
-->
