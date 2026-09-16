<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<hr class={className} {...restProps} />
