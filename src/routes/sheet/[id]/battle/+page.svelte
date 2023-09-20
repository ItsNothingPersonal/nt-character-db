<script lang="ts">
	import Tracker from '$lib/components/tracker.svelte';
	import Checkbox from '$lib/components/typography/checkbox.svelte';
	import {
		getAllDisciplineTestpools,
		getBrawlTestpool,
		getDodgeTestpool,
		getFirearmsTestpool,
		getMeleeTestpool,
		getMentalDefenseTestpool,
		getSocialDefenseTestpool,
		getTestpool
	} from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;

	let frenzy = false;
	let prone = false;
	let threeMetersOrMoreDistance = false;

	const relevantTestpools = getAllDisciplineTestpools(data.disciplines.map((e) => e.name));

	const primaryName: 'Physical' | 'Mental' =
		data.attributes.mental_value >= data.attributes.physical_value ? 'Mental' : 'Physical';
	const primaryValue =
		data.attributes.mental_value >= data.attributes.physical_value
			? data.attributes.mental_value
			: data.attributes.physical_value;
	const secondaryName: 'Physical' | 'Mental' =
		data.attributes.mental_value < data.attributes.physical_value ? 'Mental' : 'Physical';
	const secondaryValue =
		data.attributes.mental_value < data.attributes.physical_value
			? data.attributes.mental_value
			: data.attributes.physical_value;
</script>

<h1 class="h1">Battle-Sheet</h1>
<h2 class="h2">Initiative</h2>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2">
	<Tracker title={primaryName} value={primaryValue} />
	<Tracker title={secondaryName} value={secondaryValue} />
</div>

<h2 class="h2">Testpools</h2>
<div
	class="mb-6 mt-2 grid {prone
		? 'grid-cols-3 [&>label]:text-base sm:[&>label]:text-4xl'
		: 'grid-cols-2 [&>label]:text-4xl'} grid-rows-1 divide-x-2 border-2 border-gray-500 dark:border-gray-50 dark:bg-slate-900 [&>label>input]:h-10 [&>label>input]:w-10 [&>label]:p-2"
>
	<Checkbox bind:checked={frenzy}>Frenzy</Checkbox>
	<Checkbox bind:checked={prone}>Prone</Checkbox>

	{#if prone}
		<Checkbox bind:checked={threeMetersOrMoreDistance}>&ge; 3m</Checkbox>
	{/if}
</div>

<h3 class="h3">Attack</h3>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-3">
	<Tracker title="Brawl" value={getBrawlTestpool(data.attributes, data.skills, frenzy)} />
	<Tracker title="Melee" value={getMeleeTestpool(data.attributes, data.skills, frenzy)} />
	<Tracker title="Firearms" value={getFirearmsTestpool(data.attributes, data.skills, frenzy)} />
</div>

<h3 class="h3">Defense</h3>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-3">
	<Tracker
		title="Physical"
		value={getDodgeTestpool(data.attributes, data.skills, frenzy, prone, threeMetersOrMoreDistance)}
	/>
	<Tracker title="Social" value={getSocialDefenseTestpool(data.attributes, data.willpower)} />
	<Tracker title="Mental" value={getMentalDefenseTestpool(data.attributes, data.willpower)} />
</div>

<h3 class="h3">Disciplines</h3>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2">
	{#each data.disciplines as discipline}
		<Tracker
			title={discipline.name}
			value={getTestpool(discipline.name, data.attributes, data.skills, relevantTestpools)}
		/>
	{/each}
</div>
