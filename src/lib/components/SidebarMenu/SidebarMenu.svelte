<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { characterStore as characterStoreLotN } from '$lib/components/lotn/characterSheet/characterStore';
	import { menuDataLotN } from '$lib/menuData';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import type { RoleName } from '$lib/zod/roleName';
	import { onMount } from 'svelte';
	import { isMenuOpen } from './menuStore';

	export let loggedIn = false;
	export let characterCreation = false;
	export let role: RoleName | undefined = undefined;

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

	onNavigate(() => {
		isMenuOpen.set(false);
	});
</script>

{#if $isMenuOpen}
	<aside
		bind:this={sidebarRef}
		class="fixed inset-y-0 left-0 z-10 w-64 overflow-scroll bg-gray-400 p-4 text-white dark:bg-gray-700"
	>
		<nav>
			{#if loggedIn}
				<a class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700" href="/">
					<iconify-icon height="24" icon="ic:baseline-home" width="24" /> Übersicht
				</a>
			{/if}

			<hr />

			{#if loggedIn && $characterStoreLotN && !characterCreation}
				{#each menuDataLotN as menuEntry}
					<a
						class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
						href={menuEntry.href?.replace('[id]', $characterStoreLotN.id)}
					>
						<iconify-icon height="24" icon={menuEntry.icon} width="24" />
						{menuEntry.label}
					</a>
				{/each}
			{:else if loggedIn && characterCreation}
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_01') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_01"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-1" width="24" />
					Who are they?
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_02') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_02"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-2" width="24" />
					Choose A Clan
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_03') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_03"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-3" width="24" />
					Assign Generation & Blood Potency
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_04') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_04"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-4" width="24" />
					Assign Initial Attributes
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_05') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_05"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-5" width="24" />
					Assign Initial Skills
				</a>
				{#if !$characterCreationStore.ghoul}
					<a
						class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_06') ? 'ring-2 ring-black dark:ring-white' : ''}`}
						href="/lotn/sheet/create/step_06"
						type="button"
					>
						<iconify-icon height="24" icon="tabler:number-6" width="24" />
						Choose a Predator Type
					</a>
				{/if}
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_07') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_07"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-7" width="24" />
					Starting Backgrounds & Loresheets
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_08') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_08"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-8" width="24" />
					Merits & Flaws
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_09') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_09"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-9" width="24" />
					Assign Initial Disciplines
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_10') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_10"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-10" width="24" />
					Spending Initial XP
				</a>
				<a
					class={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 ${$page.url.pathname.match('/lotn/sheet/create/step_11') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_11"
					type="button"
				>
					<iconify-icon height="24" icon="tabler:number-11" width="24" />
					Finishing Touches
				</a>
			{/if}

			<hr />
			{#if role && ['Storyteller Protektorat', 'Storyteller Anarchen'].includes(role)}
				<a class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700" href="/lotn/admin">
					<iconify-icon height="24" icon="ix:cogwheel-filled" width="24" />
					Admin - Übersicht
				</a>
				<a
					class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
					href="/lotn/admin/review"
				>
					<iconify-icon height="24" icon="ix:cogwheel-filled" width="24" />
					Admin - Review
				</a>
			{/if}
			{#if loggedIn}
				<a class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700" href="/profile">
					<iconify-icon height="24" icon="mdi:book-information-variant" width="24" />
					Profil
				</a>
				<form action="/logout" method="POST">
					<button
						class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
						title="Logout"
						type="submit"
					>
						<iconify-icon height="24" icon="mdi:user" width="24" /> Logout
					</button>
				</form>
			{:else}
				<a class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700" href="/login">
					<iconify-icon height="24" icon="mdi:book-information-variant" width="24" />
					Login
				</a>
			{/if}
			<a class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700" href="/impressum">
				<iconify-icon height="24" icon="mdi:book-information-variant" width="24" />
				Impressum
			</a>
		</nav>
	</aside>
{/if}
