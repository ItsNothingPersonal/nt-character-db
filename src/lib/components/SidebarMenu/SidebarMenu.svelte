<script lang="ts">
	import { characterStore as characterStoreLotN } from '$lib/components/lotn/characterSheet/characterStore';
	import { menuDataLotN } from '$lib/menuData';
	import { onMount } from 'svelte';
	import { isMenuOpen } from './menuStore';

	export let loggedIn: boolean = false;

	let sidebarRef: HTMLElement | null = null;

	function handleClickOutside(event: MouseEvent) {
		if (sidebarRef && !sidebarRef.contains(event.target as Node)) {
			isMenuOpen.set(false);
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

{#if $isMenuOpen}
	<aside
		bind:this={sidebarRef}
		class="fixed inset-y-0 left-0 z-10 w-64 bg-gray-400 p-4 text-white dark:bg-gray-700"
	>
		<nav>
			{#if loggedIn}
				<a href="/" class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700">
					<iconify-icon height="24" icon="ic:baseline-home" width="24" /> Übersicht
				</a>
			{/if}

			<hr />

			{#if loggedIn && $characterStoreLotN}
				{#each menuDataLotN as menuEntry}
					<a
						href={menuEntry.href?.replace('[id]', $characterStoreLotN.id)}
						class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
					>
						<iconify-icon height="24" icon={menuEntry.icon} width="24" />
						{menuEntry.label}
					</a>
				{/each}
			{/if}

			<hr />

			{#if loggedIn}
				<a href="/profile" class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700">
					<iconify-icon height="24" icon="mdi:book-information-variant" width="24" />
					Profil
				</a>
				<form action="/logout" method="POST">
					<button
						title="Logout"
						type="submit"
						class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
					>
						<iconify-icon height="24" icon="mdi:user" width="24" /> Logout
					</button>
				</form>
			{:else}
				<a href="/login" class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700">
					<iconify-icon height="24" icon="mdi:book-information-variant" width="24" />
					Login
				</a>
			{/if}
			<a href="/impressum" class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700">
				<iconify-icon height="24" icon="mdi:book-information-variant" width="24" />
				Impressum
			</a>
		</nav>
	</aside>
{/if}
