<script lang="ts">
	import { getContext } from "svelte";
	import { Label } from "$components/ui/label";
	import type { ErrorsContext } from ".";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	const id = getContext<string>("id");
	const errors = getContext<ErrorsContext>("errors");
</script>

<Label
	{...$$restProps}
	for={id}
	class={cn($errors ? "text-destructive" : "", className)}
>
	<slot />
</Label>
