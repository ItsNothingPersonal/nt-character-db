<script lang="ts">
	import Tracker from '$lib/components/tracker.svelte';
	import type { DamageUpdateBody } from '$lib/zod/damageUpdateBody';
	import type { NumberUpdateBody } from '$lib/zod/numberUpdateBody';
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

	async function changeDamage(
		value: number,
		mode: 'add' | 'substract',
		damageType: 'normal' | 'aggrevated',
		characterId: string | undefined
	) {
		updating = true;

		const updateBody: DamageUpdateBody = {
			value,
			damageType
		};

		const response = await fetch(`/api/character/damageTaken/${mode}?id=${characterId}`, {
			method: 'POST',
			body: JSON.stringify(updateBody)
		});

		if (response.ok) {
			if (mode === 'add') {
				if (damageType === 'normal') {
					data.damageTaken.normal++;
				} else {
					data.damageTaken.aggrevated++;
				}
			} else {
				if (damageType === 'normal') {
					data.damageTaken.normal--;
				} else {
					data.damageTaken.aggrevated--;
				}
			}
		}

		updating = false;
	}
</script>

<h1 class="h1">Trackers</h1>
<h2 class="h2">Blood & Willpower</h2>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-2 gap-2">
	<Tracker
		title="Blood"
		value={data.blood.value}
		buttonsConfig={{
			addFunction: () => changeBlood(1, 'add', data.characterId),
			substractFunction: () => changeBlood(1, 'substract', data.characterId),
			updating
		}}
	/>
	<Tracker
		title="Willpower"
		value={data.willpower.value}
		buttonsConfig={{
			addFunction: () => changeWillpower(1, 'add', data.characterId),
			substractFunction: () => changeWillpower(1, 'substract', data.characterId),
			updating
		}}
	/>
</div>

<h2 class="h2">Damage</h2>
<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-2 gap-2">
	<Tracker
		title="Normal"
		value={data.damageTaken.normal}
		buttonsConfig={{
			addFunction: () => changeDamage(1, 'add', 'normal', data.characterId),
			substractFunction: () => changeDamage(1, 'substract', 'normal', data.characterId),
			updating
		}}
	/>
	<Tracker
		title="Aggrevated"
		value={data.damageTaken.aggrevated}
		buttonsConfig={{
			addFunction: () => changeDamage(1, 'add', 'aggrevated', data.characterId),
			substractFunction: () => changeDamage(1, 'substract', 'aggrevated', data.characterId),
			updating
		}}
	/>
</div>