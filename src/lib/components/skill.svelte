<script lang="ts">
	import { ScreenSize } from '$lib/sceenSize';
	import type { SkillName } from '$lib/zod/skillName';
	import { A, P, Tooltip } from 'flowbite-svelte';
	import { LinkSolid } from 'flowbite-svelte-icons';

	export let name: SkillName;
	export let value: number;
	export let specialization: string | undefined;

	let innerWidth: number;

	$: small = innerWidth < ScreenSize.LG;
</script>

<svelte:window bind:innerWidth />

<div class="grid grid-cols-1 auto-rows-auto max-h-fit">
	{#if small}
		<div class="grid grid-rows-1 grid-cols-2 gap-9">
			<div class="flex items-center gap-1">
				<A href="https://vamp.bynightstudios.com/vampire/skills/{name.toLowerCase()}">
					<LinkSolid size="sm" role="link" />
				</A>
				<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
			</div>
			<P size="2xl">{value}</P>
		</div>
		<P>{specialization ?? ''}</P>
	{:else}
		<div class="grid grid-rows-1 grid-cols-2">
			<A href="https://vamp.bynightstudios.com/vampire/skills/{name.toLowerCase()}">
				<div class="flex">
					<div class="flex items-center">
						<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
					</div>
				</div>
			</A>
			<P size="2xl">{value}</P>
		</div>
		{#if specialization}
			<Tooltip placement="bottom-start">{specialization}</Tooltip>
		{/if}
	{/if}
</div>
