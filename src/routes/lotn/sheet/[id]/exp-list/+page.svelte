<script lang="ts">
	import { characterStore } from '$lib/components/lotn/characterSheet/characterStore.js';
	import Tracker from '$lib/components/lotn/trackers/tracker/tracker.svelte';
	import {
		getProjectStartExp,
		parseExperienceList
	} from '$lib/components/lotn/util/experienceUtils.js';
	import { isDesktopSize } from '$lib/util.js';
	import { get } from 'svelte/store';
	export let data;

	function formatDate(date: Date) {
		return date.toLocaleDateString('de-DE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	let innerWidth = 0;
	$: expData = parseExperienceList(data.expList, get(characterStore).project);
</script>

<svelte:window bind:innerWidth />

<h1 class="h1">Experience-Log</h1>
<div class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
	<Tracker title="Start" value={getProjectStartExp(get(characterStore).project)} />
	<Tracker title="Gained" value={expData.gained} />
	<Tracker title="Spent" value={expData.spent} />
	<Tracker title="Left" value={expData.left} />
</div>
<table class="table table-hover rounded-lg">
	<thead>
		<tr>
			<th>Value</th>
			<th>Type</th>
			<th>Reason</th>
			{#if isDesktopSize(innerWidth)}
				<th>Date</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each data.expList ?? [] as entry}
			<tr>
				<td class="text-lg capitalize">
					{entry.value}
				</td>
				<td class="text-lg capitalize">
					{entry.type}
				</td>
				<td class="!text-wrap text-lg capitalize">
					{entry.reason}
				</td>
				{#if isDesktopSize(innerWidth)}
					<td class="text-lg capitalize">
						{formatDate(entry.date)}
					</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
