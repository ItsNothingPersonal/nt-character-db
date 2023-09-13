<script lang="ts">
	import type { TechniqueName } from '$lib/zod/techniqueName';
	import { A, P } from 'flowbite-svelte';

	export let name: TechniqueName;
</script>

<A href="https://vamp.bynightstudios.com/vampire/techniques/{name.toLowerCase()}">
	<P color="text-red-700 dark:text-red-500" weight="bold" size="sm">{name}</P>
</A>
