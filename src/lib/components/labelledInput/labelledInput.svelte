<script lang="ts">
	export let label: string;
	export let value: string | number | undefined;
	export let onChange: () => undefined;
</script>

<label>
	{label}
	<input
		id={label}
		class="input variant-form-material"
		type="number"
		bind:value
		on:change={onChange}
	/>
</label>
