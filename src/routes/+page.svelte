<script lang="ts">
	import { characterIdStore } from '$lib/stores/characterIdStore';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($characterIdStore) {
			throw redirect(301, `/sheet/${$characterIdStore}`);
		}
	});
</script>

<div class="container space-y-4 p-10">
	<h1>Homepage</h1>
	<hr />
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo
		sunt ipsum asperiores. Molestias nostrum mollitia cumque veniam eum error atque, dolores
		nesciunt voluptas ea consectetur sed delectus.
	</p>
</div>
