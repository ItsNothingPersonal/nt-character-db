<script lang="ts" generics="T">
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
					type="button"
					class="variant-filled btn rounded-none"
					on:click={addButton.onClick}
					disabled={addButton.disabled}
				>
					Add {label}
				</button>
			{/if}
			{#if removeButton}
				<button
					id="remove-{label.toLocaleLowerCase()}"
					type="button"
					class="variant-filled btn rounded-none"
					on:click={removeButton.onClick}
					disabled={removeButton.disabled}
				>
					Remove {label}
				</button>
			{/if}
		</div>
	{/if}
</div>
