<script lang="ts">
	import { menuData } from '$lib/menuData';
	import { characterIdStore } from '$lib/stores/characterIdStore';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		{#each menuData as menuEntry}
			<li>
				<a href={`/sheet/${$characterIdStore}/${menuEntry.href}`} on:click={drawerClose}>
					{menuEntry.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
