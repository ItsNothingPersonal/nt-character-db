<script lang="ts">
	import { characterCreationStore } from '$lib/stores/characterCreationStore';
	import { sectName } from '$lib/zod/lotn/enums/sectName';

	const convictionText = 'Your conviction';
	const touchstoneText = 'The mortal who embodies your conviction';

	$: convictionBVisible =
		$characterCreationStore.morality[0]?.conviction.length > 0 ||
		$characterCreationStore.morality[0]?.touchstone.length > 0;

	$: convictionCVisible =
		$characterCreationStore.morality[1]?.conviction.length > 0 ||
		$characterCreationStore.morality[1]?.touchstone.length > 0;

	function setConviction(index: number, conviction: string) {
		characterCreationStore.update((store) => {
			if (!store.morality[index]) {
				store.morality[index] = {
					conviction: '',
					touchstone: ''
				};
			}
			store.morality[index].conviction = conviction;

			if (
				store.morality[index].conviction.length === 0 &&
				store.morality[index].touchstone.length === 0
			) {
				store.morality = store.morality.filter((_, i) => i !== index);
			}
			return store;
		});
	}

	function setTouchstone(index: number, touchstone: string) {
		characterCreationStore.update((store) => {
			if (!store.morality[index]) {
				store.morality[index] = {
					conviction: '',
					touchstone: ''
				};
			}
			store.morality[index].touchstone = touchstone;

			if (
				store.morality[index].conviction.length === 0 &&
				store.morality[index].touchstone.length === 0
			) {
				store.morality = store.morality.filter((_, i) => i !== index);
			}
			return store;
		});
	}

	function removeMoralityEntry(index: number) {
		characterCreationStore.update((store) => {
			store.morality = store.morality.filter((_, i) => i !== index);
			return store;
		});
	}

	function setSect(event: Event) {
		const target = event.target as HTMLInputElement;
		characterCreationStore.update((store) => {
			store.sect = sectName.parse(target.value);
			return store;
		});
	}

	function updateName(event: Event) {
		const target = event.target as HTMLInputElement;
		characterCreationStore.update((store) => {
			const value = target.value.trim();
			store.name = value.length <= 0 ? undefined : value;
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
		value={$characterCreationStore.name ?? ''}
		on:change={updateName}
	/>
</label>

<label class="label">
	<span>Sect</span>
	<select class="select rounded-lg" value={$characterCreationStore.sect} on:change={setSect}>
		<option disabled selected value={undefined}>Select a sect</option>
		{#each sectName.options as sect}
			<option value={sect}>{sect}</option>
		{/each}
	</select>
</label>

<h3 class="h3 mt-4">Chronicle Tenets</h3>
<div class="space-y-2">
	<div class="overflow-hidden rounded-lg border p-4">
		<span
			class="float-left mb-2 mr-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500"
		>
			<iconify-icon height="40" icon="mdi:home-city" />
		</span>
		<h4 class="text-lg font-bold">Sei menschlich</h4>
		<p class="text-justify">
			Verursache kein unnötiges Leid und verletze keine Unschuldigen. Lass dich nicht zu Gräueltaten
			hinreißen. Sei eine Person und keine Bestie!
		</p>
	</div>

	<div class="overflow-hidden rounded-lg border p-4">
		<span
			class="float-left mb-2 mr-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500"
		>
			<iconify-icon height="40" icon="mdi:home-city"></iconify-icon>
		</span>
		<h4 class="text-lg font-bold">Sei loyal</h4>
		<p class="text-justify">
			Nürnberg ist unsere Stadt. Komme, was wolle. Sie darf nicht äußeren Kräften überlassen werden.
			Es lohnt sich dafür zu kämpfen!
		</p>
	</div>

	<div class="overflow-hidden rounded-lg border p-4">
		<span
			class="float-left mb-2 mr-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500"
		>
			<iconify-icon height="40" icon="healthicons:exercise-running" />
		</span>
		<h4 class="text-lg font-bold">Krieg’ deinen Arsch hoch</h4>
		<p class="text-justify">
			Ergreife die Möglichkeiten, die sich dir bieten. Die Stadt ist im Umbruch. Sei ein aktiver
			Teil davon!
		</p>
	</div>
</div>

<h3 class="h3 mt-4">Convictions & Touchstones</h3>
<div class="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-3 sm:grid-rows-1">
	<div class="flex flex-col gap-2">
		<label class="label">
			<div class="flex justify-between">
				<span>Conviction A</span>
				<button on:click={() => removeMoralityEntry(0)}>
					<iconify-icon class="ml-auto flex align-baseline" height="20" icon="mdi:remove" />
				</button>
			</div>
			<input
				name="convictionA"
				class="input variant-form-material"
				placeholder={convictionText}
				type="text"
				value={$characterCreationStore.morality[0]?.conviction || ''}
				on:blur={(event) => setConviction(0, event.currentTarget.value)}
			/>
		</label>
		<label class="label">
			<span>Touchstone A</span>
			<input
				name="touchstoneA"
				class="input variant-form-material"
				placeholder={touchstoneText}
				type="text"
				value={$characterCreationStore.morality[0]?.touchstone || ''}
				on:blur={(event) => setTouchstone(0, event.currentTarget.value)}
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
					value={$characterCreationStore.morality[1]?.conviction || ''}
					on:blur={(event) => setConviction(1, event.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>Touchstone B</span>
				<input
					name="touchstoneB"
					class="input variant-form-material"
					placeholder={touchstoneText}
					type="text"
					value={$characterCreationStore.morality[1]?.touchstone || ''}
					on:blur={(event) => setTouchstone(1, event.currentTarget.value)}
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
					value={$characterCreationStore.morality[2]?.conviction || ''}
					on:blur={(event) => setConviction(2, event.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>Touchstone C</span>
				<input
					name="touchstoneC"
					class="input variant-form-material"
					placeholder={touchstoneText}
					type="text"
					value={$characterCreationStore.morality[2]?.touchstone || ''}
					on:blur={(event) => setTouchstone(2, event.currentTarget.value)}
				/>
			</label>
		</div>
	{/if}
</div>
