<script lang="ts">
	export let label: string;
	export let value: string | number | undefined;
	export let onChange: () => undefined;
</script>

<label>
	{label}
	<input type="number" class="input variant-form-material" bind:value on:change={onChange} />
</label>
