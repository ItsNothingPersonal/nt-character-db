<script lang="ts">
	export let checked = false;
</script>

<label class="flex items-center gap-2">
	<input class="checkbox" type="checkbox" bind:checked />
	<p>
		<slot />
	</p>
</label>
