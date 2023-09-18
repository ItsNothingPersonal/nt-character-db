<script lang="ts">
	import type { PlayerSkill } from '$lib/zod/playerSkill';
	import ValueRating from './valueRating/valueRating.svelte';

	export let skills: PlayerSkill[];
	export let marginTop: string = 'mt-2';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/skills';
</script>

<div class={marginTop}>
	<h2 class="h2">Skills</h2>
	<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-8">
		{#each skills as skill}
			<ValueRating
				label={skill.name}
				value={skill.value}
				specialization={skill.specialization}
				href="{baseUrl}/{skill.name.toLowerCase()}"
			/>
		{/each}
	</div>
</div>
