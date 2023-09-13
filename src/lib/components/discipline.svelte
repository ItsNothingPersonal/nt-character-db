<script lang="ts">
	import type { DisciplineName } from '$lib/zod/disciplineName';
	import { A, P } from 'flowbite-svelte';

	export let name: DisciplineName;
	export let disciplineValue: number;
</script>

<div class="grid grid-rows-1 grid-cols-2">
	<A href="https://vamp.bynightstudios.com/vampire/disciplines/{name.toLowerCase()}">
		<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
	</A>
	<P size="2xl">{disciplineValue}</P>
</div>
