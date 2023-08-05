<script lang="ts">
	import * as DialogPrimitive from "$primitives/dialog";
	import { cn } from "$lib/utils";

	type $$Props = DialogPrimitive.TitleProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DialogPrimitive.Title
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Title>
