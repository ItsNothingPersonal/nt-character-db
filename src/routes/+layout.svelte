<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation/navigation.svelte';
	import Footer from '$lib/components/typography/footer.svelte';
	import { selectedCharacterIdStore } from '$lib/stores/selectedCharacterIdStore';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		Drawer,
		LightSwitch,
		Modal,
		getDrawerStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import 'iconify-icon';
	import '../app.postcss';

	export let data;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	const drawerStore = getDrawerStore();

	$: classesSidebar =
		$page.url.pathname === '/' || $page.url.pathname === '/impressum' ? 'w-0' : 'w-0 lg:w-64';

	function drawerOpen(): void {
		drawerStore.open({});
	}

	if (data.characterId) {
		selectedCharacterIdStore.set(data.characterId);
	}
</script>

<Modal />

<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell
	slotSidebarLeft="bg-surface-500/5 {classesSidebar}"
	slotPageContent="container px-2 sm:mx-auto mt-4"
	slotFooter={$page.url.pathname === '/' ? '' : 'h-0'}
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					{#if $page.url.pathname !== '/'}
						<button class="btn btn-sm mr-4 lg:hidden" on:click={drawerOpen}>
							<span>
								<svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
									<rect width="100" height="20" />
									<rect y="30" width="100" height="20" />
									<rect y="60" width="100" height="20" />
								</svg>
							</span>
						</button>
					{/if}
					<a href="/"><strong class="text-xl uppercase">Character-Sheet</strong></a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Footer -->
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
