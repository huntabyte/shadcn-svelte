<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	let {
		message = "This question is required.",
		class: className,
	}: { message?: string; class?: string } = $props();
	let context = useQuestionnaireContext();
	let visible = $derived(context.touched() && !context.validate());
</script>

{#if visible}<p
		data-slot="questionnaire-error"
		role="alert"
		class={cn("cn-questionnaire-error text-destructive", className)}
	>
		{message}
	</p>{/if}
