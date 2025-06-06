<script lang="ts">
	import type { Snippet } from "svelte";
	let { children, caption }: { children?: Snippet; caption?: string } = $props();
</script>

<figure class="mt-6 flex flex-col gap-4">
	{@render children?.()}
	<figcaption class="text-center text-sm text-gray-500">
		{caption}
	</figcaption>
</figure>
