<script lang="ts">
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	let {
		action,
		children,
		class: className,
		size: sizeProp,
		variant: variantProp,
	}: {
		action: "previous" | "next" | "skip" | "submit";
		children?: import("svelte").Snippet;
		class?: string;
		size?: ButtonSize;
		variant?: ButtonVariant;
	} = $props();
	let context = useQuestionnaireContext();
	let size = $derived(sizeProp ?? "default");
	let variant = $derived(
		variantProp ?? (action === "previous" || action === "skip" ? "outline" : "default")
	);
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
		buttonVariants({ size, variant }),
		`cn-questionnaire-${action} col-start-${action === "previous" ? 1 : action === "skip" ? 2 : 3} row-start-1 min-h-11 justify-self-${action === "previous" ? "start" : "end"} sm:min-h-0`,
		className
	)}
	disabled={(action === "previous" && context.current === 0) ||
		(action === "next" && context.current === context.total - 1)}>{@render children?.()}</button
>
