<script lang="ts">
	import { page } from '$app/stores';
	import { menuData } from '$lib/menuData';
	import { isNullOrUndefined } from '$lib/util';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { characterStore } from '../characterSheet/characterStore';

	export let loggedIn: boolean = false;
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<iconify-icon icon="ic:baseline-home" width="48" height="48" />
			</svelte:fragment>
			Übersicht
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	{#if loggedIn && $characterStore}
		{#each menuData as menuEntry}
			<AppRailAnchor
				href={menuEntry.href?.replace('[id]', $characterStore.id)}
				selected={!isNullOrUndefined(
					$page.url.pathname.match(
						`/sheet/${$characterStore.id}${menuEntry.href?.replace('/sheet/[id]', '')}$`
					)
				)}
			>
				<svelte:fragment slot="lead">
					<iconify-icon icon={menuEntry.icon} width="40" height="40" />
				</svelte:fragment>
				{menuEntry.label}
			</AppRailAnchor>
		{/each}
	{/if}
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor
			href="/impressum"
			title="Impressum"
			selected={$page.url.pathname === '/impressum'}
		>
			<svelte:fragment slot="lead">
				<iconify-icon icon="mdi:book-information-variant" width="48" height="48"></iconify-icon>
			</svelte:fragment>
			Impressum
		</AppRailAnchor>
		{#if loggedIn}
			<AppRailAnchor href="/profile" title="Account" selected={$page.url.pathname === '/profile'}>
				<svelte:fragment slot="lead">
					<iconify-icon icon="mdi:user" width="48" height="48"></iconify-icon>
				</svelte:fragment>
				Profil
			</AppRailAnchor>

			<AppRailAnchor title="Logout">
				<svelte:fragment slot="lead">
					<form action="/logout" method="POST">
						<button type="submit" title="Logout">
							<iconify-icon icon="ic:baseline-logout" width="48" height="48" />
						</button>
					</form>
				</svelte:fragment>
				Logout
			</AppRailAnchor>
		{:else}
			<AppRailAnchor href="/login" title="Login">
				<svelte:fragment slot="lead">
					<iconify-icon icon="ic:baseline-login" width="48" height="48" />
				</svelte:fragment>
				Login
			</AppRailAnchor>
		{/if}
	</svelte:fragment>
</AppRail>
