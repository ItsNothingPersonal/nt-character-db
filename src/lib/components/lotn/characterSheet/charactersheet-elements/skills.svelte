<script lang="ts">
	import EditableSkill from '../../EditableSkill/EditableSkill.svelte';
	import { isMentalSkill, isPhysicalSkill, isSocialSkill } from '../../util/skillUtil';
	import { characterStore } from '../characterStore';

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
			<EditableSkill displayStyle="dots" {skill} />
		{/each}
	</div>
	<div class="flex min-h-28 flex-col gap-2">
		{#each getSocialSkills() as skill}
			<EditableSkill displayStyle="dots" {skill} />
		{/each}
	</div>
	<div class="flex min-h-28 flex-col gap-2">
		{#each getMentalSkills() as skill}
			<EditableSkill displayStyle="dots" {skill} />
		{/each}
	</div>
</div>
