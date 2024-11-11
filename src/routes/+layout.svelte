<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation/Navigation.svelte';
	import SidebarButton from '$lib/components/SidebarMenu/SidebarButton.svelte';
	import SidebarMenu from '$lib/components/SidebarMenu/SidebarMenu.svelte';
	import Footer from '$lib/components/typography/footer.svelte';
	import { ScreenSize } from '$lib/sceenSize';
	import { isCreateSheetRoute, isNotNullOrUndefined } from '$lib/util';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		LightSwitch,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import 'iconify-icon';
	import '../app.postcss';

	export let data;
	let innerWidth: number = 0;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
</script>

<svelte:window bind:innerWidth />

<!-- App Shell -->
<AppShell
	regionPage="relative"
	slotPageContent="container px-2 sm:mx-auto mt-4 lg:mt-8"
	slotPageFooter="sticky bottom-0 z-10"
	slotSidebarLeft="bg-surface-500/5"
>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex content-center gap-2">
					{#if innerWidth < ScreenSize.SM}
						<SidebarButton />
					{/if}
					<a href="/">
						<strong class="font-comorantBold text-4xl uppercase"> Elysium </strong>
					</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if innerWidth >= ScreenSize.SM}
			<Navigation
				loggedIn={isNotNullOrUndefined(data.user)}
				characterCreation={isCreateSheetRoute()}
			/>
		{:else}
			{#key $page.url.pathname}
				<SidebarMenu
					loggedIn={isNotNullOrUndefined(data.user)}
					characterCreation={isCreateSheetRoute()}
				/>
			{/key}
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
