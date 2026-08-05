<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	let {
		message = "This question is required.",
		class: className,
	}: { message?: string; class?: string } = $props();
	let context = useQuestionnaireContext();
	let visible = $derived(!context.validate());
</script>

{#if visible}<p role="alert" class={cn("text-sm text-destructive", className)}>{message}</p>{/if}
