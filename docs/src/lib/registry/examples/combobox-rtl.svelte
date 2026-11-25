<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import XIcon from "@lucide/svelte/icons/x";
	import { Combobox } from "bits-ui";
	import { tick } from "svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				label: "Categories",
				placeholder: "Add categories",
				empty: "No categories found.",
				technology: "Technology",
				design: "Design",
				business: "Business",
				marketing: "Marketing",
				education: "Education",
				health: "Health",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				label: "الفئات",
				placeholder: "أضف فئات",
				empty: "لم يتم العثور على فئات.",
				technology: "التكنولوجيا",
				design: "التصميم",
				business: "الأعمال",
				marketing: "التسويق",
				education: "التعليم",
				health: "الصحة",
			},
		},
		he: {
			dir: "rtl",
			values: {
				label: "קטגוריות",
				placeholder: "הוסף קטגוריות",
				empty: "לא נמצאו קטגוריות.",
				technology: "טכנולוגיה",
				design: "עיצוב",
				business: "עסקים",
				marketing: "שיווק",
				education: "חינוך",
				health: "בריאות",
			},
		},
	} as const;
	const t = useTranslation(translations, "ar");
	const categories = [
		"technology",
		"design",
		"business",
		"marketing",
		"education",
		"health",
	] as const;
	type Category = (typeof categories)[number];
	let values = $state<string[]>([categories[0]]);
	let search = $state("");
	let inputRef = $state<HTMLInputElement | null>(null);
	let anchor = $state<HTMLDivElement | null>(null);
	let open = $state(false);
	const filtered = $derived(
		categories.filter((category) =>
			t.values[category]
				.toLocaleLowerCase(t.language)
				.includes(search.toLocaleLowerCase(t.language))
		)
	);
	function chipButtons() {
		return [...(anchor?.querySelectorAll<HTMLButtonElement>("[data-category-chip]") ?? [])];
	}
	function focusChip(index: number) {
		const buttons = chipButtons();
		if (index >= buttons.length || index < 0) inputRef?.focus();
		else buttons[index]?.focus();
	}
	async function removeChip(index: number) {
		values = values.filter((_, i) => i !== index);
		await tick();
		focusChip(Math.min(index, values.length - 1));
	}
	function onChipKeydown(event: KeyboardEvent, index: number) {
		if (event.isComposing || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey)
			return;
		const previousKey = t.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
		const nextKey = t.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
		if (event.key === previousKey || event.key === nextKey) {
			event.preventDefault();
			event.stopPropagation();
			// The first chip is the inline-start boundary; the input follows the last chip.
			focusChip(event.key === previousKey ? Math.max(0, index - 1) : index + 1);
		} else if (event.key === "Backspace" || event.key === "Delete") {
			event.preventDefault();
			event.stopPropagation();
			void removeChip(index);
		}
	}
	function onInputKeydown(event: KeyboardEvent) {
		if (event.isComposing || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey)
			return;
		const previousKey = t.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
		if (
			event.key === previousKey &&
			inputRef?.selectionStart === 0 &&
			inputRef.selectionEnd === 0 &&
			values.length
		) {
			event.preventDefault();
			event.stopPropagation();
			open = false;
			focusChip(values.length - 1);
		}
	}
</script>

<Field.Field class="mx-auto w-full max-w-xs">
	<Field.FieldLabel for="rtl-categories">{t.values.label}</Field.FieldLabel>
	<Combobox.Root
		type="multiple"
		bind:open
		bind:value={values}
		inputValue={search}
		onValueChange={() => {
			search = "";
		}}
		onOpenChange={(open) => {
			if (!open) search = "";
		}}
	>
		<div
			bind:this={anchor}
			class="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm shadow-xs focus-within:ring-2 focus-within:ring-ring"
		>
			{#each values as value, index (value)}
				<Badge variant="secondary" class="gap-1 pe-0.5">
					{t.values[value as Category]}
					<button
						type="button"
						class="rounded-sm p-0.5 hover:bg-muted"
						aria-label={t.values[value as Category]}
						data-category-chip={value}
						onkeydown={(event) => onChipKeydown(event, index)}
						onclick={() => removeChip(index)}
					>
						<XIcon class="size-3" />
					</button>
				</Badge>
			{/each}
			<Combobox.Input
				bind:ref={inputRef}
				onkeydown={onInputKeydown}
				id="rtl-categories"
				placeholder={t.values.placeholder}
				class="min-w-16 flex-1 bg-transparent py-1 outline-none placeholder:text-muted-foreground"
				onfocus={() => (open = true)}
				oninput={(event) => {
					search = event.currentTarget.value;
					open = true;
				}}
			>
				{#snippet child({ props })}
					<input {...props} value={search} />
				{/snippet}
			</Combobox.Input>
		</div>
		<Combobox.Portal>
			<Combobox.Content
				customAnchor={anchor}
				dir={t.dir}
				data-lang={t.dir === "rtl" ? t.language : undefined}
				align="start"
				sideOffset={4}
				class="z-50 w-(--bits-combobox-anchor-width) rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"
			>
				{#if filtered.length === 0}
					<div class="py-6 text-center text-sm">{t.values.empty}</div>
				{/if}
				<Combobox.Viewport>
					<Combobox.Group>
						{#each filtered as category (category)}
							<Combobox.Item
								value={category}
								label={t.values[category]}
								class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
							>
								{t.values[category]}
								{#if values.includes(category)}<CheckIcon class="ms-auto size-4" />{/if}
							</Combobox.Item>
						{/each}
					</Combobox.Group>
				</Combobox.Viewport>
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
</Field.Field>
