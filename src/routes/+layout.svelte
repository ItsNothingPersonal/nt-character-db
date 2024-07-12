<script lang="ts">
	import Navigation from '$lib/components/navigation/navigation.svelte';
	import Footer from '$lib/components/typography/footer.svelte';
	import { selectedCharacterIdStoreClassic } from '$lib/stores/selectedCharacterIdStore';
	import { isNotNullOrUndefined } from '$lib/util';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		LightSwitch,
		Modal,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	import '../app.postcss';

	export let data;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	onMount(() => {
		if (data.characterId) {
			selectedCharacterIdStoreClassic.set(data.characterId);
		}
	});
</script>

<Modal />

<!-- App Shell -->
<AppShell
	regionPage="relative"
	slotPageContent="container px-2 sm:mx-auto mt-4 lg:mt-8"
	slotPageFooter="sticky bottom-0 z-10"
	slotSidebarLeft="bg-surface-500/5"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<a href="/"><strong class="font-gothica text-xl uppercase">Elysium</strong></a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation loggedIn={isNotNullOrUndefined(data.user)} />
	</svelte:fragment>

	<!-- Footer -->
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
