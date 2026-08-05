<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	let {
		action,
		children,
		class: className,
	}: {
		action: "previous" | "next" | "skip" | "submit";
		children?: import("svelte").Snippet;
		class?: string;
	} = $props();
	let context = useQuestionnaireContext();
	function click() {
		if (action === "previous") context.previous();
		else if (action === "next") context.next();
		else if (action === "skip") context.skip();
	}
</script>

<button
	type={action === "submit" ? "submit" : "button"}
	onclick={click}
	class={cn(
		"inline-flex h-9 items-center justify-center rounded-md border border-input px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
		action === "submit" &&
			"border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
		className
	)}
	disabled={(action === "previous" && context.current === 0) ||
		(action === "next" && context.current === context.total - 1)}>{@render children?.()}</button
>
