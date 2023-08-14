<script lang="ts">
	import { Label } from "@/registry/new-york/ui/label";
	import { cn } from "@/utils";
	import { getContext } from "svelte";
	import type { FormFieldCtx } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const { formItemId, errors } = getContext<FormFieldCtx>("FormField");
</script>

<Label class={cn($errors && "text-destructive", className)} for={formItemId}>
	<slot />
</Label>
