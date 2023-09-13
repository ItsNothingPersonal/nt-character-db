<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { DarkMode } from 'flowbite-svelte';
	import '../app.css';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DarkMode
	class="fixed right-1 top-1 z-50 text-2xl focus:outline-none focus:ring-4 focus:ring-light-200 dark:focus:ring-light-500 md:right-2 md:top-3"
/>
<Navbar characterID={data.characterId} />
<main class="mx-auto mt-5 max-w-screen-md p-4 md:ml-12 md:mt-2 xl:mx-auto">
	<slot />
</main>
