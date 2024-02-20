<script lang="ts">
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils";

	type $$Props = FormPrimitive.DescriptionProps;
	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn("text-[0.8rem] text-muted-foreground", className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
