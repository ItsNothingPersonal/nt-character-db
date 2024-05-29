<script lang="ts">
	import { menuData } from '$lib/menuData';
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import { characterStore } from '../characterSheet/characterStore';

	export let loggedIn: boolean = false;

	let currentTile: number = 0;

	function handleLogout(event: Event) {
		// Prevent default form submission
		event.preventDefault();

		// Create and submit the form programmatically
		const form = document.createElement('form');
		form.action = '/logout';
		form.method = 'POST';
		document.body.appendChild(form);
		form.submit();
	}
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/">
			<iconify-icon icon="ic:baseline-home" width="48" height="48" />
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	{#if loggedIn && $characterStore}
		{#each menuData as menuEntry}
			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="lead">
					<iconify-icon icon={menuEntry.icon} width="40" height="40" />
				</svelte:fragment>
				<span>
					{menuEntry.label}
				</span>
			</AppRailTile>
		{/each}
	{/if}
	<!-- --- -->
	<svelte:fragment slot="trail">
		{#if loggedIn}
			<AppRailAnchor href="/profile" title="Account">
				<iconify-icon icon="mdi:user" width="48" height="48"></iconify-icon>
			</AppRailAnchor>
			<form
				action="/logout"
				method="POST"
				on:submit={handleLogout}
				class="app-rail-anchor unstyled"
			>
				<button
					type="submit"
					title="Logout"
					class="app-rail-wrapper bg-primary-hover-token flex aspect-square w-full flex-col items-center justify-center space-y-1 text-center"
				>
					<iconify-icon icon="ic:baseline-logout" width="48" height="48"></iconify-icon>
				</button>
			</form>
		{:else}
			<AppRailAnchor href="/login" title="Login">
				<iconify-icon icon="ic:baseline-login" width="48" height="48"></iconify-icon>
			</AppRailAnchor>
		{/if}
	</svelte:fragment>
</AppRail>
