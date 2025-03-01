<script lang="ts">
	import { page } from '$app/stores';
	import { registrationError } from '$lib/zod/registrationError';
</script>

<h1>Error-Code: {$page.status}</h1>
{#if $page.error}
	{#each registrationError.array().parse($page.error?.message
			.split(', ')
			.map((m) => m.split(': '))
			.map(([field, message]) => ({ field: field, message: message }))) as errorMessage}
		<p>
			<bold class="capitalize">{errorMessage.field}:</bold>
			{errorMessage.message}
		</p>
	{/each}
{/if}
