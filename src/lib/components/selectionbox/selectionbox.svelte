<script generics="T" lang="ts">
	import type { SelectionBoxButtonConfig } from './selectionboxButtonConfig';

	export let selectableValues: T[];
	export let value: T | undefined;
	export let label: string;

	export let onChange: (() => void) | undefined = undefined;
	export let addButton: SelectionBoxButtonConfig | undefined = undefined;
	export let removeButton: SelectionBoxButtonConfig | undefined = undefined;
</script>

<div class="grid auto-rows-auto grid-cols-1 gap-2">
	<label>
		{label}
		<select
			id="select-{label.toLocaleLowerCase()}"
			class="select rounded-none"
			bind:value
			on:change={onChange}
		>
			{#each selectableValues as entry}
				<option value={entry}>{entry}</option>
			{/each}
		</select>
	</label>
	{#if addButton || removeButton}
		<div>
			{#if addButton}
				<button
					id="add-{label.toLocaleLowerCase()}"
					class="variant-filled btn rounded-none"
					disabled={addButton.disabled}
					type="button"
					on:click={addButton.onClick}
				>
					Add {label}
				</button>
			{/if}
			{#if removeButton}
				<button
					id="remove-{label.toLocaleLowerCase()}"
					class="variant-filled btn rounded-none"
					disabled={removeButton.disabled}
					type="button"
					on:click={removeButton.onClick}
				>
					Remove {label}
				</button>
			{/if}
		</div>
	{/if}
</div>
