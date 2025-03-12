<script lang="ts">
	import type { Icon } from "@lucide/svelte";

	let restProps: Icon = $props();
</script>

<svg role="img" viewBox="0 0 24 24" {...restProps} xmlns="http://www.w3.org/2000/svg">
	<title>Vercel</title>
	<path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
</svg>
