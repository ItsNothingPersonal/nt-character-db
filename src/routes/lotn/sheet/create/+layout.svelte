<script lang="ts">
	import { page } from '$app/stores';
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { detectTouchscreen } from '$lib/util';
</script>

<h1 class="h1">Character-Creation</h1>
<div class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[auto_2fr]">
	{#if !detectTouchscreen()}
		<div class="flex flex-col gap-2">
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_01') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_01"
				type="button"
			>
				Who are they?
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_02') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_02"
				type="button"
			>
				Choose A Clan
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_03') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_03"
				type="button"
			>
				Assign Generation & Blood Potency
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_04') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_04"
				type="button"
			>
				Assign Initial Attributes
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_05') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_05"
				type="button"
			>
				Assign Initial Skills
			</a>
			{#if !$characterCreationStore.ghoul}
				<a
					class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_06') ? 'ring-2 ring-black dark:ring-white' : ''}`}
					href="/lotn/sheet/create/step_06"
					type="button"
				>
					Choose a Predator Type
				</a>
			{/if}
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_07') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_07"
				type="button"
			>
				Starting Backgrounds & Loresheets
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_08') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_08"
				type="button"
			>
				Merits & Flaws
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_09') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_09"
				type="button"
			>
				Assign Initial Disciplines
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_10') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_10"
				type="button"
			>
				Spending Initial XP
			</a>
			<a
				class={`variant-filled-primary btn rounded-lg ${$page.url.pathname.match('/lotn/sheet/create/step_11') ? 'ring-2 ring-black dark:ring-white' : ''}`}
				href="/lotn/sheet/create/step_11"
				type="button"
			>
				Finishing Touches
			</a>
		</div>
	{/if}
	<div class="card rounded-lg p-4">
		<slot />
	</div>
</div>
