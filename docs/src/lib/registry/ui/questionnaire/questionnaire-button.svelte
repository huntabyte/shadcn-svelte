<script lang="ts">
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = Omit<HTMLButtonAttributes, "children" | "type"> & {
		action: "previous" | "next" | "skip" | "submit";
		children?: import("svelte").Snippet;
		size?: ButtonSize;
		variant?: ButtonVariant;
	};

	let {
		action,
		children,
		class: className,
		size = "default",
		variant = action === "previous" || action === "skip" ? "outline" : "default",
		disabled = false,
		onclick,
		...restProps
	}: Props = $props();
	let context = useQuestionnaireContext();
	let visible = $derived(
		(action === "previous" && context.total > 1 && !context.first) ||
			(action === "skip" && context.activeRequired === false) ||
			(action === "next" && context.total > 1 && !context.last) ||
			(action === "submit" && context.total > 0 && context.last)
	);
	let shortcut = $derived(
		(action === "next" || action === "submit") && visible && !disabled ? "Enter" : undefined
	);

	function handleClick(event: MouseEvent) {
		onclick?.(event as Parameters<NonNullable<typeof onclick>>[0]);
		if (event.defaultPrevented || disabled) return;
		if (action === "previous") context.previous();
		else if (action === "next") context.next();
		else if (action === "skip") context.skip();
	}
</script>

<button
	type={action === "submit" ? "submit" : "button"}
	hidden={!visible}
	inert={!visible}
	tabindex={visible ? undefined : -1}
	aria-hidden={!visible || undefined}
	aria-keyshortcuts={shortcut}
	data-slot={`questionnaire-${action}`}
	data-size={size}
	data-variant={variant}
	data-status={context.status()}
	data-visible={visible ? "" : undefined}
	data-hidden={!visible ? "" : undefined}
	data-shortcut={shortcut}
	{disabled}
	onclick={handleClick}
	class={cn(
		buttonVariants({ size, variant }),
		`cn-questionnaire-${action} col-start-${action === "previous" ? 1 : action === "skip" ? 2 : 3} row-start-1 min-h-11 justify-self-${action === "previous" ? "start" : "end"} sm:min-h-0`,
		className
	)}
	{...restProps}
>
	{@render children?.()}
</button>
