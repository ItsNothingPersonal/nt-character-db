<script lang="ts">
	import ValueRating from '$lib/components/lotn/characterSheet/components/ValueRating.svelte';
	import {
		getSkillHelptext,
		isMentalSkill,
		isPhysicalSkill,
		isSocialSkill
	} from '../../util/skillUtil';
	import { characterStore } from '../characterStore';

	const changedSkills = new Map<string, number>();

	function handleChange(event: CustomEvent<{ label: string; old: number; new: number }>): void {
		console.warn('tbd' + event.detail.label);
	}

	function getPhysicalSkills() {
		return $characterStore.skills.filter((e) => isPhysicalSkill(e.name));
	}

	function getSocialSkills() {
		return $characterStore.skills.filter((e) => isSocialSkill(e.name));
	}

	function getMentalSkills() {
		return $characterStore.skills.filter((e) => isMentalSkill(e.name));
	}
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3">
	<div class="flex min-h-28 flex-col gap-2">
		{#each getPhysicalSkills() as skill}
			<ValueRating
				helpText={getSkillHelptext(skill.name)}
				label={skill.name}
				specialization={skill.specialization}
				start={changedSkills.get(skill.name)}
				bind:value={skill.value}
				on:change={handleChange}
			/>
		{/each}
	</div>
	<div class="flex min-h-28 flex-col gap-2">
		{#each getSocialSkills() as skill}
			<ValueRating
				helpText={getSkillHelptext(skill.name)}
				label={skill.name}
				specialization={skill.specialization}
				start={changedSkills.get(skill.name)}
				bind:value={skill.value}
				on:change={handleChange}
			/>
		{/each}
	</div>
	<div class="flex min-h-28 flex-col gap-2">
		{#each getMentalSkills() as skill}
			<ValueRating
				helpText={getSkillHelptext(skill.name)}
				label={skill.name}
				specialization={skill.specialization}
				start={changedSkills.get(skill.name)}
				bind:value={skill.value}
				on:change={handleChange}
			/>
		{/each}
	</div>
</div>
