<script lang="ts">
	import { cn } from "cn";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<hr class={cn("my-4 md:my-8", className)} {...restProps} />
