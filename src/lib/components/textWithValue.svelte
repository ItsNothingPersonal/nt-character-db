<script lang="ts">
	import { detectTouchscreen } from '$lib/util';
	import { A, P, Tooltip } from 'flowbite-svelte';
	import { LinkSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	export let name: string;
	export let value: number;
	export let href: string | undefined = undefined;
	export let specialization: string | undefined = undefined;

	let isTouchscreen = false;

	onMount(() => {
		isTouchscreen = detectTouchscreen();
	});
</script>

<div class="grid grid-cols-2 grid-rows-1 items-center gap-10 sm:gap-0">
	{#if isTouchscreen && specialization}
		<div class="flex gap-1">
			{#if href}
				<A {href}>
					<LinkSolid size="sm" role="link" />
				</A>
			{/if}
			<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
		</div>
	{:else if href}
		<A {href}>
			<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
		</A>
	{:else}
		<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
	{/if}
	<P size="2xl">{value}</P>
</div>
{#if specialization}
	<Tooltip placement="bottom-start">{specialization}</Tooltip>
{/if}
