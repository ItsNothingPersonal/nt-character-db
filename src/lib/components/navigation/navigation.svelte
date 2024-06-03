<script lang="ts">
	import { page } from '$app/stores';
	import { characterStore } from '$lib/components/classic/characterSheet/characterStore';
	import { menuData } from '$lib/menuData';
	import { isNullOrUndefined } from '$lib/util';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

	export let loggedIn: boolean = false;
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<iconify-icon height="48" icon="ic:baseline-home" width="48" />
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
						`sheet/${$characterStore.id}${menuEntry.href?.replace('/sheet/[id]', '')}$`
					)
				)}
			>
				<svelte:fragment slot="lead">
					<iconify-icon height="40" icon={menuEntry.icon} width="40" />
				</svelte:fragment>
				{menuEntry.label}
			</AppRailAnchor>
		{/each}
	{/if}
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor
			href="/impressum"
			selected={$page.url.pathname === '/impressum'}
			title="Impressum"
		>
			<svelte:fragment slot="lead">
				<iconify-icon height="48" icon="mdi:book-information-variant" width="48"></iconify-icon>
			</svelte:fragment>
			Impressum
		</AppRailAnchor>
		{#if loggedIn}
			<AppRailAnchor href="/profile" selected={$page.url.pathname === '/profile'} title="Account">
				<svelte:fragment slot="lead">
					<iconify-icon height="48" icon="mdi:user" width="48"></iconify-icon>
				</svelte:fragment>
				Profil
			</AppRailAnchor>

			<AppRailAnchor title="Logout">
				<svelte:fragment slot="lead">
					<form action="/logout" method="POST">
						<button title="Logout" type="submit">
							<iconify-icon height="48" icon="ic:baseline-logout" width="48" />
						</button>
					</form>
				</svelte:fragment>
				Logout
			</AppRailAnchor>
		{:else}
			<AppRailAnchor href="/login" title="Login">
				<svelte:fragment slot="lead">
					<iconify-icon height="48" icon="ic:baseline-login" width="48" />
				</svelte:fragment>
				Login
			</AppRailAnchor>
		{/if}
	</svelte:fragment>
</AppRail>
