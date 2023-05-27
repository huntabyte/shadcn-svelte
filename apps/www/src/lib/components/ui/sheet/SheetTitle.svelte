<script lang="ts">
	import type { DialogTitleProps } from "radix-svelte";
	import { Dialog as SheetPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = DialogTitleProps;
</script>

<SheetPrimitive.Title
	class={cn("text-lg font-semibold text-foreground", className)}
	{...$$restProps}
>
	<slot />
</SheetPrimitive.Title>
