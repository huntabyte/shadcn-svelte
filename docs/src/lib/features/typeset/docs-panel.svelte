<script lang="ts">
	import Copy from "@lucide/svelte/icons/copy";
	import Check from "@lucide/svelte/icons/check";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { TYPESET_MEASURES, findFont, type TypesetState } from "./typeset.svelte.js";

	let { typeset, compact = false }: { typeset: TypesetState; compact?: boolean } = $props();
	let tab = $state<"docs" | "prompt">("docs");
	let framework = $state<"sveltekit" | "vite">("sveltekit");
	let copied = $state("");

	const measure = $derived(
		TYPESET_MEASURES.find((item) => item.value === typeset.params.measure)?.width ?? "37em"
	);
	const heading = $derived(
		typeset.params.heading === "inherit" ? typeset.params.body : typeset.params.heading
	);
	const presetName = $derived(`typeset-${typeset.params.item}`);
	const preset = $derived(`.${presetName} {
  --typeset-font-body: var(--font-${typeset.params.body});
  --typeset-font-heading: var(--font-${heading});
  --typeset-font-mono: var(--font-${typeset.params.mono});
  --typeset-size: ${typeset.params.scale}px;
  --typeset-leading: ${typeset.params.leading};
  --typeset-flow: ${typeset.params.flow};
}`);
	const usage = $derived(`<div class="typeset ${presetName} max-w-[${measure}]">
  {@html content}
</div>`);
	const picked = $derived(
		[...new Set([typeset.params.body, heading, typeset.params.mono])]
			.map(findFont)
			.filter(Boolean)
	);
	const install = $derived(
		`pnpm add ${picked.map((font) => font?.definition.dependency).join(" ")}`
	);
	const fontCss = $derived.by(() => {
		const imports = picked
			.map((font) => `@import "${font?.definition.dependency}";`)
			.join("\n");
		const variables = picked
			.map((font) => `  --font-${font?.id}: ${font?.definition.family};`)
			.join("\n");
		return `${imports}\n\n:root {\n${variables}\n}`;
	});
	const prompt = $derived(`Install shadcn/typeset in this project.

1. Download ${locationOrigin()}/typeset.css next to the main CSS file.
2. Import it after Tailwind: @import "./typeset.css";
3. Install the selected fonts: ${install}
4. Add this preset:

${preset}

5. Find markdown or rich-content surfaces, ask which should use Typeset, then wrap the chosen surface:

${usage}

Use not-typeset or data-not-typeset to exclude embedded components. Verify headings, lists, tables, code, and blockquotes. Docs: ${locationOrigin()}/docs/typeset`);

	function locationOrigin() {
		return typeof window === "undefined" ? "https://shadcn-svelte.com" : window.location.origin;
	}
	async function copy(value: string, id: string) {
		await navigator.clipboard.writeText(value);
		copied = id;
		setTimeout(() => (copied = ""), 2000);
	}
</script>

<div
	class={compact
		? "flex min-h-0 flex-1 flex-col"
		: "hidden w-88 flex-col items-start gap-3 xl:flex 2xl:w-104"}
>
	<div
		class={compact
			? "flex min-h-0 flex-1 flex-col"
			: "bg-background ring-foreground/10 isolate flex max-h-[calc(100vh-16rem)] w-full flex-col overflow-hidden rounded-2xl ring-1"}
	>
		<div class="flex items-center justify-between gap-2 border-b px-4 py-3">
			<div class="bg-muted flex items-center rounded-lg p-1">
				<button
					class="data-[active=true]:bg-background rounded-md px-3 py-1 text-sm"
					data-active={tab === "docs"}
					onclick={() => (tab = "docs")}>Docs</button
				>
				<button
					class="data-[active=true]:bg-background rounded-md px-3 py-1 text-sm"
					data-active={tab === "prompt"}
					onclick={() => (tab = "prompt")}>Prompt</button
				>
			</div>
			<select
				bind:value={framework}
				class="bg-background rounded-md border px-2 py-1.5 text-sm"
				aria-label="Framework"
			>
				<option value="sveltekit">SvelteKit</option>
				<option value="vite">Vite</option>
			</select>
		</div>
		<div class="scroll-fade scrollbar-none min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
			{#if tab === "docs"}
				<div class="flex flex-col gap-6">
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">1. Create typeset.css</h3>
						<p class="text-muted-foreground text-sm leading-relaxed">
							Copy the stylesheet next to your main CSS file, then import it:
						</p>
						<Button
							variant="outline"
							size="sm"
							class="w-fit"
							onclick={async () =>
								copy(await (await fetch("/typeset.css")).text(), "css")}
						>
							{#if copied === "css"}<Check />{:else}<Copy />{/if} Copy typeset.css
						</Button>
						<pre
							class="bg-muted/60 overflow-x-auto rounded-lg p-3 font-mono text-sm">@import "tailwindcss";
@import "./typeset.css";</pre>
					</section>
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">2. Add the fonts</h3>
						<pre
							class="bg-muted/60 overflow-x-auto rounded-lg p-3 font-mono text-xs">{install}</pre>
						<pre
							class="bg-muted/60 overflow-x-auto rounded-lg p-3 font-mono text-xs">{fontCss}</pre>
					</section>
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">3. Create your custom typeset</h3>
						<pre
							class="bg-muted/60 overflow-x-auto rounded-lg p-3 font-mono text-xs">{preset}</pre>
					</section>
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">4. Wrap your content</h3>
						<pre
							class="bg-muted/60 overflow-x-auto rounded-lg p-3 font-mono text-xs">{usage}</pre>
					</section>
				</div>
			{:else}
				<div class="flex flex-col gap-2.5">
					<p class="text-muted-foreground text-sm leading-relaxed">
						One prompt with your picks baked in. Copy it into your coding agent.
					</p>
					<pre
						class="bg-muted/60 max-h-102 overflow-y-auto rounded-lg p-3 font-mono text-xs whitespace-pre-wrap">{prompt}</pre>
					<Button
						variant="outline"
						size="sm"
						class="w-fit"
						onclick={() => copy(prompt, "prompt")}
						>{#if copied === "prompt"}<Check />{:else}<Copy />{/if} Copy Prompt</Button
					>
				</div>
			{/if}
		</div>
	</div>
	{#if !compact}
		<Button variant="link" size="sm" class="text-muted-foreground" href="/docs/typeset"
			>Read the docs</Button
		>
	{/if}
</div>
