<script lang="ts">
	import type { PlayerSkill } from '$lib/zod/playerSkill';
	import { Heading } from 'flowbite-svelte';
	import TextWithValue from './textWithValue.svelte';

	export let skills: PlayerSkill[];
	export let marginTop: string = 'mt-2';

	const baseUrl = 'https://vamp.bynightstudios.com/vampire/skills';
</script>

<div class={marginTop}>
	<Heading tag="h2">Skills</Heading>
	<div class="grid auto-rows-auto grid-cols-1 xss:grid-cols-2 sm:grid-cols-3">
		{#each skills as skill}
			<TextWithValue
				name={skill.name}
				value={skill.value}
				specialization={skill.specialization}
				href="{baseUrl}/{skill.name.toLowerCase()}"
			/>
		{/each}
	</div>
</div>
