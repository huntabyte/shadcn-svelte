<script lang="ts">
	import * as AvatarPrimitive from "$primitives/avatar";
	import { cn } from "$lib/utils";

	type $$Props = AvatarPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let delayMs: $$Props["delayMs"] = undefined;
</script>

<AvatarPrimitive.Root
	{delayMs}
	class={cn(
		"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
		className
	)}
	{...$$restProps}
>
	<slot />
</AvatarPrimitive.Root>
