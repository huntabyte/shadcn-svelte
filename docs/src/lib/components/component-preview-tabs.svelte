<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { DirectionProvider } from "$lib/registry/ui/direction/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { cn } from "$lib/utils.js";
	import {
		getRtlPreviewDirection,
		rtlPreviewLanguageOptions,
		setRtlPreviewLanguageContext,
		type RtlPreviewLanguage,
	} from "./rtl-preview-language.svelte.js";

	let {
		class: className,
		previewClassName,
		align = "center",
		component,
		direction = "ltr",
		example,
		hideCode = false,
		children,
		name,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		align?: "center" | "start" | "end";
		direction?: "ltr" | "rtl";
		hideCode?: boolean;
		previewClassName?: string;
		example?: Snippet;
		component?: Component;
		name: string;
	} = $props();

	let language = $state<RtlPreviewLanguage>("ar");
	const previewDirection = $derived(
		direction === "rtl" ? getRtlPreviewDirection(language) : "ltr"
	);
	const previewAutoHeight = $derived(previewClassName?.split(/\s+/).includes("h-auto") ?? false);

	setRtlPreviewLanguageContext(
		() => language,
		(value) => {
			language = value;
		}
	);
</script>

{#snippet ExampleFallback()}
	{#if component}
		{@const Component = component}
		<Component />
	{:else}
		<p class="text-muted-foreground text-sm">
			Component
			<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
				{name}
			</code>
			not found in registry.
		</p>
	{/if}
{/snippet}

<div
	data-slot="component-preview"
	class={cn(
		"group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-lg border",
		className
	)}
	{...restProps}
>
	{#if direction === "rtl"}
		<div class="flex h-16 items-center border-b px-4">
			<Select.Root type="single" bind:value={language}>
				<Select.Trigger size="sm" class="w-36" dir="ltr" data-name="language-selector">
					{rtlPreviewLanguageOptions.find((option) => option.value === language)?.label}
				</Select.Trigger>
				<Select.Content dir="ltr" class="data-closed:animate-none data-open:animate-none">
					<Select.Group>
						{#each rtlPreviewLanguageOptions as option (option.value)}
							<Select.Item value={option.value} label={option.label} />
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Popover.Root>
				<Popover.Trigger class="ms-auto">
					<Button variant="ghost" size="icon-sm" class="size-7">
						<AlertCircleIcon />
						<span class="sr-only">Toggle</span>
					</Button>
				</Popover.Trigger>
				<Popover.Content side="bottom" align="end" class="w-56 text-xs">
					<div>
						I used AI to translate the text for demonstration purposes. It's not perfect
						and may contain errors.
					</div>
					<Separator class="-mx-2.5 w-auto!" />
					<div data-lang="ar">
						لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا تكون
						الترجمة دقيقة وقد تحتوي على أخطاء.
					</div>
					<Separator class="-mx-2.5 w-auto!" />
					<div data-lang="he">
						השתמשתי בבינה מלאכותית כדי לתרגם את הטקסט למטרות הדגמה. זה לא מושלם ויכול
						להכיל שגיאות.
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	{/if}
	<DirectionProvider direction={previewDirection}>
		<div
			data-slot="preview"
			dir={previewDirection}
			data-lang={direction === "rtl" ? language : undefined}
			class="preview flex w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
			data-llm-ignore
		>
			<div
				data-align={align}
				data-auto-height={previewAutoHeight}
				class={cn(
					"preview flex min-h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[auto-height=true]:min-h-0",
					previewClassName
				)}
			>
				{#if example}
					{@render example()}
				{:else}
					{@render ExampleFallback()}
				{/if}
			</div>
		</div>
	</DirectionProvider>
	{#if !hideCode}
		<div
			data-slot="code"
			class="overflow-hidden **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t [&_pre]:max-h-[400px]"
		>
			{@render children?.()}
		</div>
	{/if}
</div>
