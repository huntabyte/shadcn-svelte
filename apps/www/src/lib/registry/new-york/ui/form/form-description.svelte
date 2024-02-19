<script lang="ts">
	import { Description, type DescriptionProps } from "@huntabyte/fsnap";
	import { cn } from "$lib/utils";

	type $$Props = DescriptionProps;
	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<Description
	class={cn("text-[0.8rem] text-muted-foreground", className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</Description>
