<script lang="ts">
	import { detectTouchscreen } from '$lib/util';
	import type { SkillName } from '$lib/zod/skillName';
	import { A, P, Tooltip } from 'flowbite-svelte';
	import { LinkSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	export let name: SkillName;
	export let value: number;
	export let specialization: string | undefined;

	let isTouchscreen = false;

	onMount(() => {
		isTouchscreen = detectTouchscreen();
	});
</script>

<div class="grid max-h-fit auto-rows-auto grid-cols-1">
	<div class="grid grid-cols-2 grid-rows-1">
		{#if isTouchscreen}
			<div class="flex items-center gap-1">
				<A href="https://vamp.bynightstudios.com/vampire/skills/{name.toLowerCase()}">
					<LinkSolid size="sm" role="link" />
				</A>
				<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
			</div>
		{:else}
			<A href="https://vamp.bynightstudios.com/vampire/skills/{name.toLowerCase()}">
				<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
			</A>
		{/if}
		<P size="2xl">{value}</P>
	</div>
	{#if specialization}
		<Tooltip placement="bottom-start">{specialization}</Tooltip>
	{/if}
</div>
