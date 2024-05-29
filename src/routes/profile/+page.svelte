<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Account from './account.svelte';
	import Profile from './profile.svelte';
	import Security from './security.svelte';

	export let data;
	export let form;

	let tabSet = 0;
</script>

<h3 class="text-2xl font-medium">Einstellungen</h3>
<hr class="py-2" />
<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>Account</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Profil</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Sicherheit</Tab>

	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<Profile {data} />
		{:else if tabSet === 1}
			<Account {data} {form} />
		{:else if tabSet === 2}
			<Security />
		{/if}
	</svelte:fragment>
</TabGroup>
