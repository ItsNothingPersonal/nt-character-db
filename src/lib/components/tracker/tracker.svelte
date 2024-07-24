<script lang="ts">
	export let title: string;
	export let value: number | string;
	export let buttonsConfig:
		| {
				addFunction: () => void;
				substractFunction: () => void;
				updating: boolean;
		  }
		| {
				addFunction: () => void;
				substractFunction: () => void;
				updating: boolean;
				max: number;
		  }
		| undefined = undefined;
</script>

<div
	class={`bg-light-100 grid ${buttonsConfig ? 'grid-rows-[auto_2fr_1fr]' : 'grid-rows-[auto_1fr]'} w-full border-2 border-gray-500 text-center dark:border-gray-50 dark:bg-slate-900`}
>
	<p class="font-bold">{title}</p>
	<p class="mb-4 w-full text-8xl">
		{value}
	</p>

	{#if buttonsConfig}
		<div class="grid h-full w-full grid-cols-2 grid-rows-1 gap-x-1 pb-1 pl-1 pr-1">
			<button
				class="variant-filled-primary btn rounded-none"
				disabled={buttonsConfig.updating || ('max' in buttonsConfig && value === buttonsConfig.max)}
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
