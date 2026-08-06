<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { createQuestionnaireContext, type QuestionnaireItem } from "./context.js";

	let {
		items,
		defaultItem,
		shortcuts = null,
		onsubmit,
		class: className,
		children,
	}: {
		items: QuestionnaireItem[];
		defaultItem?: string;
		shortcuts?: "letters" | "numbers" | null;
		onsubmit?: (event: SubmitEvent) => void;
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();

	let form = $state<HTMLFormElement | null>(null);
	let activeItem = $state("");
	let touched = $state<Record<string, boolean>>({});
	let enabledItems = $derived.by(() => items.filter((item) => !item.disabled));
	$effect(() => {
		if (!activeItem) activeItem = defaultItem ?? enabledItems[0]?.name ?? "";
	});
	let current = $derived(
		Math.max(
			0,
			enabledItems.findIndex((item) => item.name === activeItem)
		)
	);

	function itemAt(index: number) {
		return enabledItems[Math.min(Math.max(index, 0), enabledItems.length - 1)];
	}

	function setItem(name: string) {
		if (enabledItems.some((item) => item.name === name)) activeItem = name;
	}

	function validate(name = activeItem) {
		const item = items.find((entry) => entry.name === name);
		if (!item?.required || !form) return true;
		const data = new FormData(form);
		const value = data.getAll(name).some((entry) => String(entry).trim().length > 0);
		return value;
	}

	function next() {
		touched[activeItem] = true;
		if (!validate()) return;
		const nextItem = itemAt(current + 1);
		if (nextItem) activeItem = nextItem.name;
	}

	function previous() {
		const previousItem = itemAt(current - 1);
		if (previousItem) activeItem = previousItem.name;
	}

	function skip() {
		const item = items.find((entry) => entry.name === activeItem);
		if (item?.required) return;
		touched[activeItem] = true;
		next();
	}

	function onsubmitHandler(event: SubmitEvent) {
		const invalid = enabledItems.find((item) => !validate(item.name));
		if (invalid) {
			event.preventDefault();
			activeItem = invalid.name;
		}
		onsubmit?.(event);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			previous();
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			next();
		} else if (event.key === "Enter" && !event.repeat) {
			const target = event.target as HTMLElement;
			if (target instanceof HTMLInputElement && target.type !== "text") {
				event.preventDefault();
				next();
			}
		} else if (shortcuts && !(event.target as HTMLElement)?.matches("input, textarea, select")) {
			const key = shortcuts === "letters" ? event.key.toUpperCase() : event.key;
			const index = shortcuts === "letters" ? key.charCodeAt(0) - 65 : Number(key) - 1;
			if (index >= 0 && index < 26) {
				const control = form?.querySelector<HTMLInputElement>(
					`[data-questionnaire-shortcut="${key}"]`
				);
				if (control) {
					event.preventDefault();
					control.click();
				}
			}
		}
	}

	createQuestionnaireContext({
		get items() {
			return items;
		},
		get activeItem() {
			return activeItem;
		},
		get current() {
			return current;
		},
		get total() {
			return enabledItems.length;
		},
		setItem,
		next,
		previous,
		skip,
		validate,
		get form() {
			return form;
		},
		get shortcuts() {
			return shortcuts;
		},
		item(name = activeItem) {
			return items.find((entry) => entry.name === name);
		},
		value(name: string) {
			return form ? new FormData(form).getAll(name).map(String) : [];
		},
		markTouched(name = activeItem) {
			touched[name] = true;
		},
		touched(name = activeItem) {
			return !!touched[name];
		},
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<form
	bind:this={form}
	role="application"
	class={cn("cn-questionnaire flex w-full min-w-0 flex-col", className)}
	onsubmit={onsubmitHandler}
	{onkeydown}
>
	{@render children?.()}
</form>
