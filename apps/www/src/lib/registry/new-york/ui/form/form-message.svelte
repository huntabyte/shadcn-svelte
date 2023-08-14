<script lang="ts">
	import { cn } from "@/utils";
	import { getContext } from "svelte";
	import type { FormFieldCtx } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const { errors, formMessageId } = getContext<FormFieldCtx>("FormField");
</script>

{#if $errors}
	<p
		class={cn("text-[0.8rem] font-medium text-destructive", className)}
		id={formMessageId}
	>
		{$errors}
	</p>
{/if}
