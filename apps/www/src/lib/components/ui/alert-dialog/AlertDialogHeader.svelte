<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLDivAttributes } from "$primitives/internal";

	type $$Props = HTMLDivAttributes;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	class={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
	{...$$restProps}
>
	<slot />
</div>
