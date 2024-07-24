<script lang="ts">
	import { characterStore } from '$lib/components/lotn/characterSheet/characterStore';
	import { isMortal } from '$lib/components/lotn/util/mortalUtil';
	import Tracker from '$lib/components/tracker/tracker.svelte';
	import type { PlayerHealthUpdateRequestBody } from '$lib/zod/lotn/playerCharacter/playerHealth';
	import {
		playerHumanity,
		type PlayerHumanity
	} from '$lib/zod/lotn/playerCharacter/playerHumanity';
	import type { PlayerWillpowerUpdateRequestBody } from '$lib/zod/lotn/playerCharacter/playerWillpower';
	import { get } from 'svelte/store';

	export let updating = false;

	let healthRemaining: number;
	$: {
		if ($characterStore) {
			healthRemaining =
				$characterStore.attributes.physical_stamina +
				3 -
				$characterStore.health.normal -
				$characterStore.health.aggrevated;
		}
	}

	async function changeDamage(
		value: number,
		type: 'add' | 'substract',
		damageType: 'normal' | 'aggrevated'
	) {
		updating = true;

		const updateBody: PlayerHealthUpdateRequestBody = {
			character_id: $characterStore.id,
			updateData: { damageType, type, value }
		};

		const response = await fetch(`/api/lotn/character/health`, {
			method: 'PUT',
			body: JSON.stringify(updateBody)
		});

		if (response.ok) {
			if (type === 'add') {
				if (damageType === 'normal') {
					$characterStore.health.normal++;
				} else {
					$characterStore.health.aggrevated++;
				}
			} else {
				if (damageType === 'normal') {
					$characterStore.health.normal--;
				} else {
					$characterStore.health.aggrevated--;
				}
			}
		}

		updating = false;
	}

	function getHealthStatus() {
		if (healthRemaining > 3) {
			return 'Healthy';
		} else if (healthRemaining > 0) {
			return 'Injured - Loose your simple action every round.';
		} else if (healthRemaining === 0) {
			if (!isMortal()) {
				return 'Any additional damage results in torpor.';
			} else {
				return 'Looses consciousness, any additonal damage results in death.';
			}
		} else {
			if (!isMortal()) {
				return 'Torpor';
			} else {
				return 'Death';
			}
		}
	}

	function getWillpowerStatus() {
		if ($characterStore.willpower.value > 0) {
			return 'Ok';
		} else {
			return 'Impaired';
		}
	}

	async function changeWillpower(value: number, type: 'add' | 'substract') {
		updating = true;

		const valueServer =
			type === 'add'
				? $characterStore.willpower.value + value
				: $characterStore.willpower.value - value;

		const updateBody: PlayerWillpowerUpdateRequestBody = {
			character_id: $characterStore.id,
			updateData: { value: valueServer }
		};

		const response = await fetch(`/api/lotn/character/willpower`, {
			method: 'PUT',
			body: JSON.stringify(updateBody)
		});

		if (response.ok) {
			if (type === 'add') {
				$characterStore.willpower.value += value;
			} else {
				$characterStore.willpower.value -= value;
			}
		}

		updating = false;
	}

	async function changeMorality(updateData: PlayerHumanity) {
		updating = true;

		const updateBody: PlayerWillpowerUpdateRequestBody = {
			character_id: $characterStore.id,
			updateData
		};

		const response = await fetch(`/api/lotn/character/humanity`, {
			method: 'PUT',
			body: JSON.stringify(updateBody)
		});

		if (response.ok) {
			const data = playerHumanity.parse(await response.json());

			$characterStore.humanity.value = data.value;
			$characterStore.humanity.stains = data.stains;
		}

		updating = false;
	}
</script>

<h1 class="h1">Trackers</h1>
<div class="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2">
	<div class="card rounded-sm p-4">
		<h2 class="h2">Health</h2>
		<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-4">
			<div class="grid auto-rows-auto grid-cols-2 gap-2 sm:grid-cols-3">
				<Tracker title="Health Total" value={get(characterStore).attributes.physical_stamina + 3} />
				<Tracker title="Health Remaining" value={healthRemaining} />
				<div class="col-span-2 sm:col-span-1">
					<p class="text-center font-bold">Status</p>
					{#key healthRemaining}
						<p class="my-auto pb-2 text-center">
							{getHealthStatus()}
						</p>
					{/key}
				</div>
			</div>
			<div class="row-start-2 grid grid-cols-2 gap-2">
				<Tracker
					buttonsConfig={{
						addFunction: () => changeDamage(1, 'add', 'normal'),
						substractFunction: () => changeDamage(1, 'substract', 'normal'),
						updating,
						max:
							get(characterStore).attributes.physical_stamina +
							3 -
							$characterStore.health.aggrevated +
							1
					}}
					title="Normal"
					value={$characterStore.health.normal}
				/>

				<Tracker
					buttonsConfig={{
						addFunction: () => changeDamage(1, 'add', 'aggrevated'),
						substractFunction: () => changeDamage(1, 'substract', 'aggrevated'),
						updating,
						max:
							get(characterStore).attributes.physical_stamina +
							3 -
							$characterStore.health.normal +
							1
					}}
					title="Aggrevated"
					value={$characterStore.health.aggrevated}
				/>
			</div>
		</div>
	</div>
	<div class="card rounded-sm p-4">
		<h2 class="h2">Willpower</h2>
		<div class="mb-4 mt-2 grid grid-cols-1 grid-rows-1 gap-4">
			<div class="grid grid-cols-3 grid-rows-1 gap-2 sm:grid-cols-3">
				<Tracker
					title="Willpower Total"
					value={$characterStore.attributes.social_composure +
						$characterStore.attributes.mental_resolve}
				/>

				<Tracker
					buttonsConfig={{
						addFunction: () => changeWillpower(1, 'add'),
						substractFunction: () => changeWillpower(1, 'substract'),
						updating,
						max:
							$characterStore.attributes.social_composure +
							$characterStore.attributes.mental_resolve
					}}
					title="Willpower Remaining"
					value={$characterStore.willpower.value}
				/>

				<div class="col-span-2 sm:col-span-1">
					<p class="text-center font-bold">Status</p>
					{#key $characterStore.willpower.value}
						<p class="my-auto pb-2 text-center">
							{getWillpowerStatus()}
						</p>
					{/key}
				</div>
			</div>
		</div>
	</div>
</div>

<div class="card mt-4 rounded-sm p-4">
	<h2 class="h2">Humanity & Stains</h2>
	<div class="mb-4 mt-2 grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2">
		<div class="row-start-2 grid grid-cols-2 gap-2">
			<Tracker
				buttonsConfig={{
					addFunction: () =>
						changeMorality({
							value: $characterStore.humanity.value + 1,
							stains: $characterStore.humanity.stains
						}),
					substractFunction: () =>
						changeMorality({
							value: $characterStore.humanity.value - 1,
							stains: $characterStore.humanity.stains
						}),
					updating,
					max: 10
				}}
				title="Humanity"
				value={$characterStore.humanity.value}
			/>

			<Tracker
				buttonsConfig={{
					addFunction: () =>
						changeMorality({
							value: $characterStore.humanity.value,
							stains: $characterStore.humanity.stains + 1
						}),
					substractFunction: () =>
						changeMorality({
							value: $characterStore.humanity.value,
							stains: $characterStore.humanity.stains - 1
						}),
					updating,
					max: 10 - $characterStore.humanity.value
				}}
				title="Stains"
				value={$characterStore.humanity.stains}
			/>
		</div>
	</div>
</div>
