<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLAttributes<HTMLHRElement>;
</script>

<hr class={cn("my-4 md:my-8", className)} {...$$restProps} />
