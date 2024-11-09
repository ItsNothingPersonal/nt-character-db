<script lang="ts">
	export let checked = false;
	export let onChange = () => {};
</script>

<label class="flex items-center gap-2">
	<input class="checkbox h-10 w-10" type="checkbox" bind:checked on:change={onChange} />
	<p>
		<slot />
	</p>
</label>
