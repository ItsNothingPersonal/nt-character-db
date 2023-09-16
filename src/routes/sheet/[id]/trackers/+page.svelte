<script lang="ts">
	import Tracker from '$lib/components/tracker.svelte';
	import type { NumberUpdateBody } from '$lib/zod/numberUpdateBody';
	import { Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let updating = false;

	async function changeBlood(
		value: number,
		mode: 'add' | 'substract',
		characterId: string | undefined
	) {
		updating = true;

		const updateBody: NumberUpdateBody = {
			value
		};
		const response = await fetch(`/api/character/blood/${mode}?id=${characterId}`, {
			method: 'POST',
			body: JSON.stringify(updateBody)
		});

		if (response.ok) {
			if (mode === 'add') {
				data.blood.value++;
			} else {
				data.blood.value--;
			}
		}

		updating = false;
	}

	async function changeWillpower(
		value: number,
		mode: 'add' | 'substract',
		characterId: string | undefined
	) {
		updating = true;

		const updateBody: NumberUpdateBody = {
			value
		};
		const response = await fetch(`/api/character/willpower/${mode}?id=${characterId}`, {
			method: 'POST',
			body: JSON.stringify(updateBody)
		});

		if (response.ok) {
			if (mode === 'add') {
				data.willpower.value++;
			} else {
				data.willpower.value--;
			}
		}

		updating = false;
	}
</script>

<div class="mt-2">
	<Heading tag="h2">Trackers</Heading>
	<div class="grid grid-cols-1 gap-2 sm:grid-cols-4">
		<Tracker
			title="Blood"
			value={data.blood.value}
			addFunction={() => changeBlood(1, 'add', data.characterId)}
			substractFunction={() => changeBlood(1, 'substract', data.characterId)}
			{updating}
		/>
		<Tracker
			title="Willpower"
			value={data.willpower.value}
			addFunction={() => changeWillpower(1, 'add', data.characterId)}
			substractFunction={() => changeWillpower(1, 'substract', data.characterId)}
			{updating}
		/>
	</div>
</div>
