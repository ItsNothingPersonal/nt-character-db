<script lang="ts">
	import { menuData } from '$lib/menuData';
	import { selectedCharacterIdStore } from '$lib/stores/selectedCharacterIdStore';
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
				<a
					class="!rounded-none"
					href={`/sheet/${$selectedCharacterIdStore}/${menuEntry.href}`}
					on:click={drawerClose}
				>
					{menuEntry.label}
				</a>
			</li>
		{/each}
	</ul>
	<hr />
	<a class="!rounded-none" href="/impressum" on:click={drawerClose}> Impressum </a>
</nav>
