<script lang="ts">
	import { isNullOrUndefined } from '$lib/util';
	import P from '../typography/p.svelte';

	export let label: string;
	export let value: number | undefined = undefined;
	export let href: string | undefined = undefined;
	export let specialization: string[] | string | undefined = undefined;
</script>

<div class="grid auto-rows-auto grid-cols-1">
	<label class="label flex w-full flex-col" for={label}>
		{#if href}
			<a {href} class="underline decoration-dotted">
				<span class="whitespace-nowrap font-bold">{label}</span>
			</a>
		{:else}
			<span class="whitespace-nowrap font-bold">{label}</span>
		{/if}
		{#if !isNullOrUndefined(value)}
			<P id={label}>{value}</P>
		{/if}
	</label>

	{#if specialization}
		<p class="text-sm">
			{Array.isArray(specialization) ? specialization.join(', ') : specialization}
		</p>
	{/if}
</div>
