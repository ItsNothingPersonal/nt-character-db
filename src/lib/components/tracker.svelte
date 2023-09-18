<script lang="ts">
	export let title: string;
	export let value: number;
	export let buttonsConfig:
		| { addFunction: () => void; substractFunction: () => void; updating: boolean }
		| undefined = undefined;
</script>

<div
	class="grid grid-flow-row-dense grid-cols-1 {buttonsConfig
		? 'grid-rows-double-center'
		: 'grid-rows-title-content'} bg-light-100 items-center border-2 border-gray-500 dark:border-gray-50 dark:bg-slate-900"
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
				type="button"
				class="variant-filled btn"
				on:click={buttonsConfig.addFunction}
				disabled={buttonsConfig.updating}
			>
				<iconify-icon icon="ic:baseline-plus"></iconify-icon>
			</button>
			<button
				type="button"
				class="variant-filled btn"
				on:click={buttonsConfig.substractFunction}
				disabled={buttonsConfig.updating}
			>
				<iconify-icon icon="ic:baseline-minus"></iconify-icon>
			</button>
		</div>
	{/if}
</div>
