<script lang="ts">
	import { detectTouchscreen, isNullOrUndefined } from '$lib/util';
	import { onMount } from 'svelte';

	export let label: string;
	export let value: number | undefined = undefined;
	export let href: string | undefined = undefined;
	export let specialization: string[] | string | undefined = undefined;

	let isTouchscreen = false;

	onMount(() => {
		isTouchscreen = detectTouchscreen();
	});
</script>

<div class="grid auto-rows-auto grid-cols-1">
	<div class="grid grid-cols-min-content-2 grid-rows-1 gap-2">
		{#if isTouchscreen && specialization}
			<div class="flex gap-1">
				{#if href}
					<a {href} class="underline decoration-dotted">
						<iconify-icon icon="material-symbols:link"></iconify-icon>
					</a>
				{/if}
				<p class="font-bold">{label}</p>
			</div>
		{:else if href}
			<a {href} class="underline decoration-dotted">
				<p class="font-bold">{label}</p>
			</a>
		{:else}
			<p class="font-bold">{label}</p>
		{/if}
		{#if !isNullOrUndefined(value)}
			<p>{value}</p>
		{/if}
	</div>

	{#if specialization}
		<p class="text-sm">
			{Array.isArray(specialization) ? specialization.join(', ') : specialization}
		</p>
	{/if}
</div>
