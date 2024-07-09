<script lang="ts">
	import ValueRating from '$lib/components/lotn/characterSheet/components/ValueRating.svelte';
	import { type SkillName } from '$lib/zod/lotn/enums/skillName';
	import { skillConfig } from '../../config/skillConfig';
	import { isMentalSkill, isPhysicalSkill, isSocialSkill } from '../../util/skillUtil';
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

	function getSkillHelptext(skill: SkillName): string | undefined {
		if (isPhysicalSkill(skill)) {
			return skillConfig.physical[skill].helptext;
		} else if (isSocialSkill(skill)) {
			return skillConfig.social[skill].helptext;
		} else if (isMentalSkill(skill)) {
			return skillConfig.mental[skill].helptext;
		}
		return undefined;
	}
</script>

<div class="grid auto-rows-auto grid-cols-2 gap-4 sm:grid-cols-3">
	<div class="flex flex-col gap-2">
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
	<div class="flex flex-col gap-2">
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
	<div class="flex flex-col gap-2">
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
