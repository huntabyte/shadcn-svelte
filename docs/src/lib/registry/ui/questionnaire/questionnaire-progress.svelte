<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	let { class: className }: { class?: string } = $props();
	let context = useQuestionnaireContext();
	let value = $derived(context.total ? ((context.current + 1) / context.total) * 100 : 0);
</script>

<div
	class={cn("grid gap-2", className)}
	role="progressbar"
	aria-valuemin="1"
	aria-valuemax={context.total}
	aria-valuenow={context.current + 1}
>
	<div class="flex justify-between text-xs text-muted-foreground">
		<span>Question {context.current + 1}</span><span>{context.total} total</span>
	</div>
	<div class="h-2 overflow-hidden rounded-full bg-muted">
		<div class="h-full bg-primary transition-all" style={`width: ${value}%`}></div>
	</div>
</div>
