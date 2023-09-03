<script lang="ts">
	import { page } from '$app/stores';
	import { isNullOrUndefined } from '$lib/util';
	import {
		CloseButton,
		Drawer,
		NavHamburger,
		Sidebar,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import { menuData } from '../menuData';

	export let characterID = '';

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let drawerHidden = true;
	let backdrop = true;
	let activateClickOutside = true;

	onMount(() => {
		activateClickOutside = true;
	});

	const toggleSide = () => {
		drawerHidden = !drawerHidden;
	};
</script>

<NavHamburger
	on:click={toggleSide}
	class="rounded-lg text-lg p-2.5 fixed left-1 top-1 md:top-3 md:left-2 z-50 md:block focus:outline-none focus:ring-4 focus:ring-light-200 dark:focus:ring-light-500"
/>

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	width="w-64"
	class="overflow-auto pb-32 bg-light-50 dark:bg-dark "
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 lg:hidden" />
	</div>
	<Sidebar asideClass="w-54">
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded">
			<SidebarGroup>
				{#each menuData as { label, href, subData }}
					{#if isNullOrUndefined(subData)}
						<SidebarItem
							{label}
							href={`/sheet/${characterID}/${href}`}
							spanClass="pl-2 self-center text-md whitespace-nowrap"
							on:click={toggleSide}
							active={$page.url.pathname === href}
						/>
					{:else}
						<SidebarDropdownWrapper {label}>
							{#each subData ?? [] as { href, label }}
								<SidebarItem
									{label}
									href={`/sheet/${characterID}/${href}`}
									spanClass="pl-2 self-center text-md whitespace-nowrap"
									on:click={toggleSide}
									active={$page.url.pathname === href}
								/>
							{/each}
						</SidebarDropdownWrapper>
					{/if}
				{/each}
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>
