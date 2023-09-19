<script lang="ts">
	import type { PlayerSkill } from '$lib/zod/playerSkill';
	import ValueRating from './valueRating/valueRating.svelte';

	export let skills: PlayerSkill[];

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/skills';
</script>

<div
	class="grid auto-rows-auto grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6"
>
	{#each skills as skill}
		<ValueRating
			label={skill.name}
			value={skill.value}
			specialization={skill.specialization}
			href="{baseUrl}/{skill.name.toLowerCase()}"
		/>
	{/each}
</div>
