<script lang="ts">
	import { tick } from "svelte";
	import {
		createQuestionnaireContext,
		type QuestionnaireItemDefinition,
		type QuestionnaireItemRegistration,
		type QuestionnaireItemStatus,
		type QuestionnaireShortcutMode,
	} from "./internal/context.js";
	import type { HTMLFormAttributes } from "svelte/elements";

	type Props = Omit<HTMLFormAttributes, "children" | "item" | "onsubmit" | "onreset"> & {
		items?: readonly QuestionnaireItemDefinition[];
		defaultItem?: string;
		item?: string;
		onItemChange?: (item: string) => void;
		shortcuts?: QuestionnaireShortcutMode;
		onsubmit?: (event: SubmitEvent) => void;
		onreset?: (event: Event) => void;
		children?: import("svelte").Snippet;
	};

	let {
		items: itemDefinitions,
		defaultItem,
		item = $bindable(),
		onItemChange,
		shortcuts: shortcutMode,
		onsubmit,
		onreset,
		onkeydown,
		children,
		novalidate = true,
		...restProps
	}: Props = $props();

	let form = $state<HTMLFormElement | null>(null);
	let registrations = $state<QuestionnaireItemRegistration[]>([]);
	let skipped = $state<Record<string, boolean>>({});
	let validationAttempted = $state<Record<string, boolean>>({});
	let version = $state(0);

	let items = $derived(
		itemDefinitions ??
			registrations.map((entry) => ({
				name: entry.name,
				required: entry.required,
				disabled: entry.disabled,
			}))
	);
	let enabledItems = $derived(items.filter((entry) => !entry.disabled));
	let activeItem = $derived(
		item ??
			enabledItems.find((entry) => entry.name === defaultItem)?.name ??
			enabledItems[0]?.name ??
			""
	);
	let currentIndex = $derived(enabledItems.findIndex((entry) => entry.name === activeItem));
	let current = $derived(currentIndex < 0 ? 0 : currentIndex + 1);

	$effect(() => {
		if (!enabledItems.length) return;
		if (!item || currentIndex < 0) {
			const preferred = enabledItems.find((entry) => entry.name === defaultItem)?.name;
			setItem(preferred ?? enabledItems[0].name, "item");
		}
	});

	function registration(name = activeItem) {
		return registrations.find((entry) => entry.name === name);
	}

	function itemDefinition(name = activeItem) {
		return items.find((entry) => entry.name === name);
	}

	function registerItem(next: QuestionnaireItemRegistration) {
		registrations = [...registrations.filter((entry) => entry.name !== next.name), next];
		return () => {
			registrations = registrations.filter((entry) => entry.name !== next.name);
		};
	}

	async function focus(name: string, target: "item" | "invalid") {
		await tick();
		const entry = registration(name);
		if (!entry?.element) return;
		if (target === "invalid") {
			const control = entry.element.querySelector<HTMLElement>(
				"input[data-filled]:not(:disabled), input:not([type=hidden]):not(:disabled), textarea:not(:disabled)"
			);
			(control ?? entry.element).focus();
		} else {
			entry.element.focus();
		}
	}

	function setItem(name: string, focusTarget: "item" | "invalid" = "item") {
		if (!enabledItems.some((entry) => entry.name === name)) return;
		const changed = item !== name;
		item = name;
		if (changed) onItemChange?.(name);
		void focus(name, focusTarget);
	}

	function values(name: string) {
		version;
		if (!form) return [];
		return new FormData(form)
			.getAll(name)
			.map(String)
			.filter((value) => value.trim().length > 0);
	}

	function status(name = activeItem): QuestionnaireItemStatus {
		if (skipped[name]) return "skipped";
		return values(name).length ? "answered" : "unanswered";
	}

	function validate(name = activeItem) {
		validationAttempted[name] = true;
		version += 1;
		const definition = itemDefinition(name);
		const entry = registration(name);
		if (definition?.disabled || entry?.disabled) return true;
		if (status(name) === "skipped" && !(definition?.required ?? entry?.required)) return true;
		return !entry?.invalid && status(name) === "answered";
	}

	function invalid(name = activeItem) {
		const entry = registration(name);
		return (
			!!entry?.invalid ||
			(!!validationAttempted[name] &&
				!(
					status(name) === "answered" ||
					(status(name) === "skipped" && !(itemDefinition(name)?.required ?? entry?.required))
				))
		);
	}

	function next() {
		if (!validate()) {
			void focus(activeItem, "invalid");
			return;
		}
		const nextItem = enabledItems[currentIndex + 1];
		if (nextItem) setItem(nextItem.name);
	}

	function previous() {
		const previousItem = enabledItems[currentIndex - 1];
		if (previousItem) setItem(previousItem.name);
	}

	function clearItem(name: string) {
		const fieldset = registration(name)?.element;
		if (!fieldset) return;
		for (const control of fieldset.querySelectorAll<HTMLInputElement>("input")) {
			if (control.type === "checkbox" || control.type === "radio") control.checked = false;
			else control.value = "";
		}
		for (const control of fieldset.querySelectorAll<HTMLTextAreaElement>("textarea")) {
			control.value = "";
		}
		for (const control of fieldset.querySelectorAll<HTMLSelectElement>("select")) {
			control.value = "";
		}
	}

	function skip() {
		if (itemDefinition()?.required ?? registration()?.required) return;
		clearItem(activeItem);
		skipped[activeItem] = true;
		version += 1;
		const nextItem = enabledItems[currentIndex + 1];
		if (nextItem) setItem(nextItem.name);
		else queueMicrotask(() => form?.requestSubmit());
	}

	function markAnswered(name = activeItem) {
		skipped[name] = false;
		version += 1;
	}

	function multiple(name = activeItem) {
		return !!registration(name)?.multiple;
	}

	function selected(name: string, value: string) {
		return values(name).includes(value);
	}

	function selectControl(name: string, control: HTMLInputElement) {
		const entry = registration(name);
		if (entry && !entry.multiple && control.value.trim()) {
			for (const other of entry.element?.querySelectorAll<HTMLInputElement>("input") ?? []) {
				if (other === control) continue;
				if (other.type === "checkbox" || other.type === "radio") other.checked = false;
				else other.value = "";
			}
		}
		markAnswered(name);
	}

	function shortcut(name: string, value: string, control: HTMLInputElement | null) {
		if (!shortcutMode) return null;
		const definition = itemDefinitions?.find((entry) => entry.name === name);
		let index =
			definition?.choices
				?.filter((choice) => !choice.disabled)
				.findIndex((choice) => choice.value === value) ?? -1;
		if (index < 0 && control) {
			index = Array.from(
				registration(name)?.element?.querySelectorAll<HTMLInputElement>(
					"input[type=radio], input[type=checkbox]"
				) ?? []
			)
				.filter((entry) => !entry.disabled)
				.indexOf(control);
		}
		if (index < 0 || (shortcutMode === "numbers" && index > 8) || index > 25) return null;
		return shortcutMode === "letters" ? String.fromCharCode(65 + index) : String(index + 1);
	}

	function handleSubmit(event: SubmitEvent) {
		const firstInvalid = enabledItems.find((entry) => !validate(entry.name));
		if (firstInvalid) {
			event.preventDefault();
			setItem(firstInvalid.name, "invalid");
			return;
		}
		onsubmit?.(event);
	}

	function handleReset(event: Event) {
		onreset?.(event);
		if (event.defaultPrevented) return;
		queueMicrotask(() => {
			skipped = {};
			validationAttempted = {};
			version += 1;
			const resetItem = enabledItems.find((entry) => entry.name === defaultItem) ?? enabledItems[0];
			if (resetItem) setItem(resetItem.name);
		});
	}

	function isTextEntryTarget(target: EventTarget | null) {
		return (
			target instanceof HTMLTextAreaElement ||
			target instanceof HTMLSelectElement ||
			(target instanceof HTMLInputElement &&
				!["button", "checkbox", "radio", "reset", "submit"].includes(target.type))
		);
	}

	function handleKeydown(event: KeyboardEvent) {
		onkeydown?.(event as Parameters<NonNullable<typeof onkeydown>>[0]);
		if (
			event.defaultPrevented ||
			event.isComposing ||
			event.keyCode === 229 ||
			!(event.target instanceof Element)
		)
			return;
		if (
			event.key === "Enter" &&
			(event.metaKey || event.ctrlKey) &&
			!event.altKey &&
			!event.shiftKey
		) {
			event.preventDefault();
			if (!event.repeat) currentIndex === enabledItems.length - 1 ? form?.requestSubmit() : next();
			return;
		}
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		if (
			(event.key === "ArrowLeft" || event.key === "ArrowRight") &&
			!isTextEntryTarget(event.target) &&
			!(event.target instanceof HTMLInputElement && event.target.type === "radio")
		) {
			event.preventDefault();
			if (!event.repeat)
				event.key === "ArrowLeft" ? previous() : status() !== "unanswered" && next();
			return;
		}
		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			const controls = Array.from(
				registration()?.element?.querySelectorAll<HTMLInputElement>("input:not(:disabled)") ?? []
			);
			const index = controls.indexOf(event.target as HTMLInputElement);
			if (
				controls.length &&
				index >= 0 &&
				!(isTextEntryTarget(event.target) && (event.target as HTMLInputElement).value)
			) {
				event.preventDefault();
				controls[
					(index + (event.key === "ArrowDown" ? 1 : -1) + controls.length) % controls.length
				]?.focus();
				return;
			}
		}
		if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
			if (
				(event.target.type === "checkbox" ||
					event.target.type === "radio" ||
					event.target.value.trim()) &&
				!event.repeat
			) {
				event.preventDefault();
				currentIndex === enabledItems.length - 1 ? form?.requestSubmit() : next();
			}
			return;
		}
		if (!shortcutMode || isTextEntryTarget(event.target)) return;
		const key = shortcutMode === "letters" ? event.key.toUpperCase() : event.key;
		const control = Array.from(
			registration()?.element?.querySelectorAll<HTMLInputElement>(
				"[data-questionnaire-shortcut]"
			) ?? []
		).find((entry) => entry.dataset.questionnaireShortcut === key);
		if (control) {
			event.preventDefault();
			if (!event.repeat) {
				control.focus();
				control.click();
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
		get first() {
			return enabledItems.length > 0 && currentIndex === 0;
		},
		get last() {
			return enabledItems.length > 0 && currentIndex === enabledItems.length - 1;
		},
		get activeRequired() {
			return currentIndex < 0 ? null : !!(itemDefinition()?.required ?? registration()?.required);
		},
		get shortcuts() {
			return shortcutMode ?? null;
		},
		registerItem,
		setItem,
		next,
		previous,
		skip,
		validate,
		status,
		invalid,
		markAnswered,
		multiple,
		selected,
		selectControl,
		shortcut,
	});
</script>

<form
	bind:this={form}
	data-shortcuts={shortcutMode}
	{novalidate}
	onsubmit={handleSubmit}
	onreset={handleReset}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</form>
