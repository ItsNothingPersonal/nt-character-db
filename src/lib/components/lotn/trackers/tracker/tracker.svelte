<script lang="ts">
	export let title: string;
	export let value: number;
	export let buttonsConfig:
		| { addFunction: () => void; substractFunction: () => void; updating: boolean }
		| undefined = undefined;
</script>

<div
	class="card grid grid-flow-row-dense grid-cols-1 rounded-lg {buttonsConfig
		? 'grid-rows-[auto_2fr_1fr]'
		: 'grid-rows-[auto_1fr]'} items-center"
>
	<p class="text-center font-bold">
		{title}
	</p>

	<p class="my-auto pb-2 text-center text-8xl font-bold">
		{value}
	</p>

	{#if buttonsConfig}
		<div class="grid h-full w-full grid-cols-2 grid-rows-1 gap-x-1 pb-1 pl-1 pr-1">
			<button
				class="variant-filled-primary btn rounded-none"
				disabled={buttonsConfig.updating}
				type="button"
				on:click={buttonsConfig.addFunction}
			>
				<iconify-icon icon="ic:baseline-plus"></iconify-icon>
			</button>
			<button
				class="variant-filled-secondary btn rounded-none"
				disabled={buttonsConfig.updating || value === 0}
				type="button"
				on:click={buttonsConfig.substractFunction}
			>
				<iconify-icon icon="ic:baseline-minus"></iconify-icon>
			</button>
		</div>
	{/if}
</div>
