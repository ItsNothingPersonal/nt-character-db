<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { DarkMode } from 'flowbite-svelte';
	import '../app.css';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DarkMode
	class="text-2xl fixed right-1 top-1 md:top-3 md:right-2 z-50 focus:outline-none focus:ring-4 focus:ring-light-200 dark:focus:ring-light-500"
/>
<Navbar characterID={data.characterId} />
<main class="mx-auto text-center mt-5 md:mt-2 max-w-screen-md p-4">
	<slot />
</main>
