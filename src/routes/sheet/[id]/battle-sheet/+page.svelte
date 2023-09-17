<script lang="ts">
	import Tracker from '$lib/components/tracker.svelte';
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
	import { Checkbox, Heading } from 'flowbite-svelte';
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

<Heading tag="h1">Battle-Sheet</Heading>
<Heading tag="h2">Initiative</Heading>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2">
	<Tracker title={primaryName} value={primaryValue} />
	<Tracker title={secondaryName} value={secondaryValue} />
</div>

<Heading tag="h2">Testpools</Heading>
<div
	class="dark:divide-gray-60 mb-2 mt-2 grid {prone
		? 'grid-cols-3'
		: 'grid-cols-2'} mb-6 mt-2 grid-rows-1 gap-2 divide-x divide-gray-200 rounded-lg border border-gray-500 dark:border-gray-50 dark:bg-slate-900"
>
	<Checkbox
		bind:checked={frenzy}
		class="p-3 {prone
			? 'text-base'
			: 'text-4xl'} sm:text-4xl [&>input]:h-11 [&>input]:w-11 [&>input]:text-5xl"
	>
		Frenzy
	</Checkbox>
	<Checkbox
		bind:checked={prone}
		class="p-3 {prone
			? 'text-base'
			: 'text-4xl'} sm:text-4xl [&>input]:h-11 [&>input]:w-11 [&>input]:text-5xl"
	>
		Prone
	</Checkbox>
	{#if prone}
		<Checkbox
			bind:checked={threeMetersOrMoreDistance}
			class="p-3 {prone
				? 'text-base'
				: 'text-4xl'} sm:text-4xl [&>input]:h-11 [&>input]:w-11 [&>input]:text-5xl"
		>
			&ge; 3m
		</Checkbox>
	{/if}
</div>

<Heading tag="h3">Attack</Heading>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-3">
	<Tracker title="Brawl" value={getBrawlTestpool(data.attributes, data.skills, frenzy)} />
	<Tracker title="Melee" value={getMeleeTestpool(data.attributes, data.skills, frenzy)} />
	<Tracker title="Firearms" value={getFirearmsTestpool(data.attributes, data.skills, frenzy)} />
</div>

<Heading tag="h3">Defense</Heading>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-3">
	<Tracker
		title="Physical"
		value={getDodgeTestpool(data.attributes, data.skills, frenzy, prone, threeMetersOrMoreDistance)}
	/>
	<Tracker title="Social" value={getSocialDefenseTestpool(data.attributes, data.willpower)} />
	<Tracker title="Mental" value={getMentalDefenseTestpool(data.attributes, data.willpower)} />
</div>

<Heading tag="h3">Disciplines</Heading>
<div class="mb-6 mt-2 grid auto-rows-auto grid-cols-2 gap-2">
	{#each data.disciplines as discipline}
		<Tracker
			title={discipline.name}
			value={getTestpool(discipline.name, data.attributes, data.skills, relevantTestpools)}
		/>
	{/each}
</div>
