<script lang="ts">
	import { Button, P } from 'flowbite-svelte';
	import { MinusSolid, PlusSolid } from 'flowbite-svelte-icons';

	export let title: string;
	export let value: number;
	export let addFunction: () => void;
	export let substractFunction: () => void;
	export let updating: boolean;
</script>

<div
	class="mt-4 grid grid-flow-row-dense grid-cols-1 grid-rows-double-center items-center border-2 border-gray-500 bg-light-100 dark:border-gray-50 dark:bg-slate-900"
>
	<P weight="bold" size="2xl" align="center">
		{title}
	</P>

	<P
		weight="bold"
		size="8xl"
		align="center"
		class="my-auto pb-2"
		color="text-red-700 dark:text-red-500"
	>
		{value}
	</P>

	<div class="grid h-full w-full grid-cols-2 grid-rows-1 gap-x-1 pb-1 pl-1 pr-1">
		<Button on:click={addFunction} disabled={updating}><PlusSolid /></Button>
		<Button on:click={substractFunction} disabled={updating}><MinusSolid /></Button>
	</div>
</div>
