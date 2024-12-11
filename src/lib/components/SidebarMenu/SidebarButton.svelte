<script lang="ts">
	import { isMenuOpen } from './menuStore';

	function toggleMenu(event: MouseEvent): void {
		event.stopPropagation(); // Prevent the event from bubbling up
		isMenuOpen.update((open) => !open);
	}
</script>

<button class="rounded-md p-2 text-white" on:click={toggleMenu}>
	<svg
		class="h-6 w-6"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M4 6h16M4 12h16m-7 6h7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
		></path>
	</svg>
</button>
