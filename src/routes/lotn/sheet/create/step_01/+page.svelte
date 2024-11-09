<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { sectName, type SectName } from '$lib/zod/lotn/enums/sectName';
	import { onMount } from 'svelte';

	onMount(() => {
		convictionA = $characterCreationStore.morality[0]?.conviction || '';
		touchstoneA = $characterCreationStore.morality[0]?.touchstone || '';
		convictionB = $characterCreationStore.morality[1]?.conviction || '';
		touchstoneB = $characterCreationStore.morality[1]?.touchstone || '';
		convictionC = $characterCreationStore.morality[2]?.conviction || '';
		touchstoneC = $characterCreationStore.morality[2]?.touchstone || '';
		selectedSect = $characterCreationStore.sect;
	});

	let convictionA = '';
	let touchstoneA = '';
	let convictionB = '';
	let touchstoneB = '';
	let convictionC = '';
	let touchstoneC = '';

	const convictionText = 'Your conviction';
	const touchstoneText = 'The mortal who embodies your conviction';

	let selectedSect: SectName | undefined = undefined;

	$: convictionBVisible =
		$characterCreationStore.morality[0]?.conviction.length > 0 ||
		$characterCreationStore.morality[0]?.touchstone.length > 0;

	$: convictionCVisible =
		$characterCreationStore.morality[1]?.conviction.length > 0 ||
		$characterCreationStore.morality[1]?.touchstone.length > 0;

	function setConviction(index: number, conviction: string) {
		if (!$characterCreationStore.morality[index]) {
			$characterCreationStore.morality[index] = {
				conviction: '',
				touchstone: ''
			};
		}
		$characterCreationStore.morality[index].conviction = conviction;

		if (
			$characterCreationStore.morality[index].conviction.length === 0 &&
			$characterCreationStore.morality[index].touchstone.length === 0
		) {
			$characterCreationStore.morality = $characterCreationStore.morality.filter(
				(_, i) => i !== index
			);

			if (index === 1) {
				convictionB = convictionC;
				convictionC = '';
				touchstoneB = touchstoneC;
				touchstoneC = '';
			} else if (index === 0) {
				convictionA = convictionB;
				convictionB = '';
				touchstoneA = touchstoneB;
				touchstoneB = '';
			}
		}

		$characterCreationStore = $characterCreationStore;
	}

	function setTouchstone(index: number, touchstone: string) {
		if (!$characterCreationStore.morality[index]) {
			$characterCreationStore.morality[index] = {
				conviction: '',
				touchstone: ''
			};
		}
		$characterCreationStore.morality[index].touchstone = touchstone;

		if (
			$characterCreationStore.morality[index].conviction.length === 0 &&
			$characterCreationStore.morality[index].touchstone.length === 0
		) {
			$characterCreationStore.morality = $characterCreationStore.morality.filter(
				(_, i) => i !== index
			);

			if (index === 1) {
				convictionB = convictionC;
				convictionC = '';
				touchstoneB = touchstoneC;
				touchstoneC = '';
			} else if (index === 0) {
				convictionA = convictionB;
				if (convictionC.length > 0) {
					convictionB = convictionC;
					convictionC = '';
				} else {
					convictionB = '';
				}
				touchstoneA = touchstoneB;
				if (touchstoneC.length > 0) {
					touchstoneB = touchstoneC;
					touchstoneC = '';
				} else {
					touchstoneB = '';
				}
			}
		}

		$characterCreationStore = $characterCreationStore;
	}

	function setSect() {
		characterCreationStore.update((store) => {
			store.sect = selectedSect;
			return store;
		});
	}
</script>

<label class="label">
	<span>Name</span>
	<input
		name="name"
		class="input variant-form-material"
		placeholder="Select a name for your character"
		type="text"
		bind:value={$characterCreationStore.name}
	/>
</label>

<label class="label">
	<span>Sect</span>
	<select class="select rounded-lg" bind:value={selectedSect} on:change={setSect}>
		<option disabled selected value={undefined}>Select a sect</option>
		{#each sectName.options as sect}
			<option value={sect}>{sect}</option>
		{/each}
	</select>
</label>

<h3 class="h3 mt-4">Chronicle Tenets</h3>
<dl class="list-dl">
	<div>
		<span class="badge rounded-lg bg-primary-500">
			<iconify-icon height="40" icon="mdi:shield-person" />
		</span>
		<span class="flex-auto">
			<dt class="font-bold">Sei menschlich</dt>
			<dd>
				Verursache kein unnötiges Leid und verletze keine Unschuldigen. Lass dich nicht zu
				Gräueltaten hinreißen. Sei eine Person und keine Bestie!
			</dd>
		</span>
	</div>
	<div>
		<span class="badge rounded-lg bg-primary-500">
			<iconify-icon height="40" icon="mdi:home-city" />
		</span>
		<span class="flex-auto">
			<dt class="font-bold">Sei loyal</dt>
			<dd>
				Nürnberg ist unsere Stadt. Komme, was wolle. Sie darf nicht äußeren Kräften überlassen
				werden. Es lohnt sich dafür zu kämpfen!
			</dd>
		</span>
	</div>
	<div>
		<span class="badge rounded-lg bg-primary-500">
			<iconify-icon height="40" icon="healthicons:exercise-running" />
		</span>
		<span class="flex-auto">
			<dt class="font-bold">Krieg’ deinen Arsch hoch</dt>
			<dd>
				Ergreife die Möglichkeiten, die sich dir bieten. Die Stadt ist im Umbruch. Sei ein aktiver
				Teil davon!
			</dd>
		</span>
	</div>
</dl>

<h3 class="h3 mt-4">Convictions & Touchstones</h3>
<div class="grid grid-cols-3 grid-rows-1 gap-2">
	<div class="flex flex-col gap-2">
		<label class="label">
			<div class="flex">
				<span>Conviction A</span>
				<iconify-icon class="ml-auto flex align-baseline" height="20" icon="mdi:remove" />
			</div>
			<input
				name="convictionA"
				class="input variant-form-material"
				placeholder={convictionText}
				type="text"
				bind:value={convictionA}
				on:blur={() => setConviction(0, convictionA)}
			/>
		</label>
		<label class="label">
			<span>Touchstone A</span>
			<input
				name="touchstoneA"
				class="input variant-form-material"
				placeholder={touchstoneText}
				type="text"
				bind:value={touchstoneA}
				on:blur={() => setTouchstone(0, touchstoneA)}
			/>
		</label>
	</div>
	{#if convictionBVisible}
		<div class="flex flex-col gap-2">
			<label class="label">
				<span>Conviction B</span>
				<input
					name="convictionB"
					class="input variant-form-material"
					placeholder={convictionText}
					type="text"
					bind:value={convictionB}
					on:blur={() => setConviction(1, convictionB)}
				/>
			</label>
			<label class="label">
				<span>Touchstone B</span>
				<input
					name="touchstoneB"
					class="input variant-form-material"
					placeholder={touchstoneText}
					type="text"
					bind:value={touchstoneB}
					on:blur={() => setTouchstone(1, touchstoneB)}
				/>
			</label>
		</div>
	{/if}
	{#if convictionCVisible}
		<div class="flex flex-col gap-2">
			<label class="label">
				<span>Conviction C</span>
				<input
					name="convictionC"
					class="input variant-form-material"
					placeholder={convictionText}
					type="text"
					bind:value={convictionC}
					on:blur={() => setConviction(2, convictionC)}
				/>
			</label>
			<label class="label">
				<span>Touchstone C</span>
				<input
					name="touchstoneC"
					class="input variant-form-material"
					placeholder={touchstoneText}
					type="text"
					bind:value={touchstoneC}
					on:blur={() => setTouchstone(2, touchstoneC)}
				/>
			</label>
		</div>
	{/if}
</div>
