<script lang="ts" module>
	import type { BadgeTone } from "$lib/registry/ui/badge/badge.svelte";

	export type RecordFieldOption = { value: string; label: string; tone?: BadgeTone };

	export type RecordFieldType =
		| "text"
		| "textarea"
		| "number"
		| "currency"
		| "date"
		| "select"
		| "boolean"
		| "email"
		| "url";

	export type RecordField<TRecord> = {
		id: string;
		label: string;
		type: RecordFieldType;
		/** The choices of a select field. A tone colors its badge. */
		options?: RecordFieldOption[];
		/** An ISO currency code for a currency field. Default USD. */
		currency?: string;
		placeholder?: string;
		readonly?: boolean;
		/** Read the value from the record. Default: record[id]. */
		get?: (record: TRecord) => unknown;
	};
</script>

<script lang="ts" generics="TRecord extends Record<string, unknown>">
	import { tick } from "svelte";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import { cn } from "$lib/utils.js";

	// A record's fields as label and value rows. Click a value to edit it in place: Enter or leaving the field saves,
	// Escape cancels. Composed from Input, NativeSelect, Textarea, Switch, Badge and Button; the layout follows the
	// Twenty record page.
	let {
		record,
		fields,
		onChange,
		readonly = false,
		locale,
		class: className,
	}: {
		record: TRecord;
		fields: RecordField<TRecord>[];
		/** Called with the field id and the new value (a string, a number, a boolean or null). May be async. */
		onChange?: (fieldId: string, value: unknown) => void | Promise<void>;
		/** Show the values without editing. */
		readonly?: boolean;
		/** A BCP 47 locale for numbers, currency and dates. Default: the browser's. */
		locale?: string;
		class?: string;
	} = $props();

	const valueOf = (field: RecordField<TRecord>) =>
		field.get ? field.get(record) : record[field.id];

	let editing = $state<string | null>(null);
	let draft = $state("");
	let invalid = $state<string | null>(null);
	let saving = $state(false);
	let cancelled = false;
	let inputEl = $state<HTMLElement | null>(null);

	function format(field: RecordField<TRecord>, value: unknown): string {
		if (value === null || value === undefined || value === "") return "";
		switch (field.type) {
			case "currency":
				try {
					return new Intl.NumberFormat(locale, {
						style: "currency",
						currency: field.currency ?? "USD",
					}).format(Number(value));
				} catch {
					// An invalid currency code must not break the whole list.
					return new Intl.NumberFormat(locale).format(Number(value));
				}
			case "number":
				return new Intl.NumberFormat(locale).format(Number(value));
			case "date": {
				const d = new Date(
					/^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? `${value}T00:00:00` : String(value)
				);
				return Number.isNaN(d.getTime())
					? String(value)
					: d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
			}
			default:
				return String(value);
		}
	}

	async function startEdit(field: RecordField<TRecord>) {
		if (readonly || field.readonly || field.type === "boolean" || saving) return;
		const value = valueOf(field);
		draft = value === null || value === undefined ? "" : String(value);
		invalid = null;
		cancelled = false;
		editing = field.id;
		await tick();
		inputEl?.focus();
		if (inputEl instanceof HTMLInputElement && field.type !== "date") inputEl.select();
	}

	function parse(field: RecordField<TRecord>): unknown {
		// A number input binds a number, not a string, so read the draft as text first.
		const text = String(draft ?? "").trim();
		if (field.type === "number" || field.type === "currency")
			return text === "" ? null : Number(text);
		return text === "" ? null : field.type === "textarea" ? draft : text;
	}

	// viaKeyboard: the user pressed Enter. Only then is focus pulled back to a field whose save failed; a failed save after
	// the user tabbed or clicked away leaves the field open and marked invalid, without stealing focus (no focus trap).
	async function commit(field: RecordField<TRecord>, viaKeyboard = false) {
		if (editing !== field.id || cancelled || saving) return;
		const next = parse(field);
		const current = valueOf(field) ?? null;
		if (next === current || (next === null && current === "")) {
			editing = null;
			return;
		}
		// An email or URL field uses the browser's own validation before anything is saved.
		if (
			next !== null &&
			(field.type === "email" || field.type === "url") &&
			inputEl instanceof HTMLInputElement &&
			!inputEl.checkValidity()
		) {
			invalid = field.id;
			if (viaKeyboard) inputEl.focus();
			return;
		}
		saving = true;
		try {
			await onChange?.(field.id, next);
			editing = null;
			invalid = null;
		} catch {
			invalid = field.id;
			if (viaKeyboard) {
				await tick();
				inputEl?.focus();
			}
		} finally {
			saving = false;
		}
	}

	function cancel() {
		cancelled = true;
		editing = null;
		invalid = null;
	}

	function keydown(event: KeyboardEvent, field: RecordField<TRecord>) {
		if (event.key === "Escape") {
			event.preventDefault();
			cancel();
		} else if (
			event.key === "Enter" &&
			(field.type !== "textarea" || event.metaKey || event.ctrlKey)
		) {
			event.preventDefault();
			commit(field, true);
		}
	}

	// The switch is controlled: it reads the record's value, so when onChange throws the record keeps the old value and the
	// switch snaps back.
	async function toggle(field: RecordField<TRecord>, checked: boolean) {
		if (readonly || field.readonly) return;
		try {
			await onChange?.(field.id, checked);
		} catch {
			// Nothing to do: the record was not changed.
		}
	}
</script>

<dl data-slot="record-fields" class={cn("flex flex-col gap-0.5", className)}>
	{#each fields as field (field.id)}
		{@const value = valueOf(field)}
		{@const text = format(field, value)}
		{@const option = field.options?.find((o) => o.value === value)}
		{@const locked = readonly || field.readonly}
		<div data-field={field.id} class="grid grid-cols-[7rem_minmax(0,1fr)] items-start gap-2">
			<dt class="flex h-8 items-center text-[13px] text-muted-foreground">{field.label}</dt>
			<dd class="min-w-0">
				{#if editing === field.id}
					{#if field.type === "select"}
						<NativeSelect.Root
							bind:ref={inputEl as HTMLSelectElement | null}
							bind:value={draft}
							aria-label={field.label}
							aria-invalid={invalid === field.id || undefined}
							class="w-full"
							onchange={() => commit(field)}
							onblur={() => commit(field)}
							onkeydown={(e: KeyboardEvent) => keydown(e, field)}
						>
							<NativeSelect.Option value="">{field.placeholder ?? "Empty"}</NativeSelect.Option>
							{#each field.options ?? [] as o (o.value)}
								<NativeSelect.Option value={o.value}>{o.label}</NativeSelect.Option>
							{/each}
						</NativeSelect.Root>
					{:else if field.type === "textarea"}
						<Textarea
							bind:ref={inputEl as HTMLTextAreaElement | null}
							bind:value={draft}
							aria-label={field.label}
							aria-invalid={invalid === field.id || undefined}
							readonly={saving}
							rows={3}
							placeholder={field.placeholder}
							onblur={() => commit(field)}
							onkeydown={(e: KeyboardEvent) => keydown(e, field)}
						/>
					{:else}
						<Input
							bind:ref={inputEl as HTMLInputElement | null}
							bind:value={draft}
							type={field.type === "number" || field.type === "currency"
								? "number"
								: field.type === "date"
									? "date"
									: field.type === "email"
										? "email"
										: field.type === "url"
											? "url"
											: "text"}
							step={field.type === "number" || field.type === "currency" ? "any" : undefined}
							aria-label={field.label}
							aria-invalid={invalid === field.id || undefined}
							readonly={saving}
							placeholder={field.placeholder}
							onblur={() => commit(field)}
							onkeydown={(e: KeyboardEvent) => keydown(e, field)}
						/>
					{/if}
				{:else if field.type === "boolean"}
					<div class="flex h-8 items-center">
						<Switch
							aria-label={field.label}
							bind:checked={() => value === true, (checked) => toggle(field, checked)}
							disabled={locked}
						/>
					</div>
				{:else if locked}
					<div class={cn("flex h-8 items-center text-[13px]", !text && "text-muted-foreground")}>
						{#if !text}
							{field.placeholder ?? "Empty"}
						{:else if field.type === "select"}
							<Badge tone={option?.tone ?? "gray"}>{option?.label ?? text}</Badge>
						{:else}
							<span class="truncate">{text}</span>
						{/if}
					</div>
				{:else}
					<Button
						type="button"
						variant="ghost"
						class={cn(
							"-ms-2 h-8 w-full justify-start gap-2 px-2 text-[13px] font-normal",
							!text && "text-muted-foreground"
						)}
						onclick={() => startEdit(field)}
					>
						<span class="sr-only">Edit {field.label}:</span>
						{#if !text}
							<span>{field.placeholder ?? "Empty"}</span>
						{:else if field.type === "select"}
							<Badge tone={option?.tone ?? "gray"}>{option?.label ?? text}</Badge>
						{:else}
							<span class="truncate">{text}</span>
						{/if}
					</Button>
				{/if}
			</dd>
		</div>
	{/each}
</dl>
