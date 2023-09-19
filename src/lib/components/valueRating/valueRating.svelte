<script lang="ts">
	import { Ratings } from '@skeletonlabs/skeleton';

	export let label: string;
	export let value: number;
	export let specialization: string[] | string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let max = 5;
</script>

<div class="flex flex-col">
	<label class="label grid grid-cols-1 grid-rows-2" for="clan">
		{#if href}
			<a {href}>
				<span class="font-bold">{label}</span>
			</a>
		{:else}
			<span class="font-bold">{label}</span>
		{/if}

		<p id="clan">
			<Ratings bind:value {max} justify="justify-left">
				<svelte:fragment slot="empty">
					<iconify-icon icon="prime:circle"></iconify-icon>
				</svelte:fragment>
				<svelte:fragment slot="full">
					<iconify-icon icon="prime:circle-fill"></iconify-icon>
				</svelte:fragment>
			</Ratings>
		</p>
	</label>
	{#if specialization}
		<p class="text-sm">
			{Array.isArray(specialization) ? specialization.join(', ') : specialization}
		</p>
	{/if}
</div>
