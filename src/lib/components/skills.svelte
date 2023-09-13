<script lang="ts">
	import type { PlayerSkill } from '$lib/zod/playerSkill';
	import { Heading } from 'flowbite-svelte';
	import Skill from './skill.svelte';

	export let skills: PlayerSkill[];
	export let marginTop: string = 'mt-2';
</script>

<div class={marginTop}>
	<Heading tag="h2">Skills</Heading>
	<div class="grid auto-rows-auto grid-cols-2 sm:grid-cols-3">
		{#each skills as skill}
			<Skill name={skill.name} value={skill.value} specialization={skill.specialization} />
		{/each}
	</div>
</div>
