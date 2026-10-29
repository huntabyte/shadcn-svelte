<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import { onMount } from "svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import PMInstall from "$lib/components/pm-install.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { TYPESET_MEASURES, findFont, type TypesetState } from "./typeset.svelte.js";

	const frameworkOptions = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "vite", label: "Vite" },
		{ value: "astro", label: "Astro" },
	] as const;

	let { typeset, compact = false }: { typeset: TypesetState; compact?: boolean } = $props();
	let tab = $state<"docs" | "prompt">("docs");
	let framework = $state<(typeof frameworkOptions)[number]["value"]>("sveltekit");
	let copied = $state("");
	let rawCss = $state<string | null>(null);

	onMount(() => {
		let active = true;
		fetch("/typeset.css")
			.then((response) => {
				if (!response.ok) throw new Error("Unable to load typeset.css");
				return response.text();
			})
			.then((text) => {
				if (active) rawCss = text;
			})
			.catch(() => {
				// Keep copying disabled when the stylesheet is unavailable.
			});
		return () => {
			active = false;
		};
	});

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
	const presetWithImports = $derived(`/* app.css */
@import "tailwindcss";
@import "./typeset.css";

${preset}`);
	const usage = $derived(
		framework === "astro"
			? `<div class="typeset ${presetName} max-w-[${measure}]" set:html={content}></div>`
			: `<div class="typeset ${presetName} max-w-[${measure}]">
  {@html content}
</div>`
	);
	const picked = $derived(
		[...new Set([typeset.params.body, heading, typeset.params.mono])].map(findFont).filter(Boolean)
	);
	const fontPackages = $derived(picked.map((font) => font?.definition.dependency).join(" "));
	const install = $derived(`npm install ${fontPackages}`);
	const fontCss = $derived.by(() => {
		const imports = picked.map((font) => `@import "${font?.definition.dependency}";`).join("\n");
		const variables = picked
			.map((font) => `  --font-${font?.id}: ${font?.definition.family};`)
			.join("\n");
		return `/* app.css */\n${imports}\n\n:root {\n${variables}\n}`;
	});
	const fontStep = $derived(`Install the fonts:

${install}

Then import them in the main CSS file:

${fontCss}`);
	const prompt = $derived(`Install shadcn-svelte/typeset in this project.

Typeset is a single stylesheet that styles rendered markdown: wrap the output in a \`typeset\` container and everything inside (headings, lists, tables, code, blockquotes, math) is styled. Everything outside is untouched.

1. Download ${locationOrigin()}/typeset.css and save it as typeset.css next to the project's main CSS file (where Tailwind is imported). If the file already exists, replace it with the downloaded copy.

2. Import it in the main CSS file, after the Tailwind import:

@import "./typeset.css";

3. ${fontStep}

4. Add this preset to the main CSS file, after the typeset import. If a class named .${presetName} already exists, update its values in place. Leave any other typeset-* presets untouched: they are separate surfaces:

${preset}

5. Do not apply the class anywhere yet. Search the project for surfaces that render markdown or rich content: mdsvex or MDsX components, {@html} with parsed markdown, prose classes, CMS content renderers. Present the candidates you find as a short list and ask the user which surface should use typeset. Then wrap only the surface they pick:

${usage}

If the picked surface already has its own typography (a prose class, styled markdown components), list those styles and let the user decide what to remove before wrapping.

Notes:

- To exclude an embedded component from typeset styles, add the not-typeset class or the data-not-typeset attribute to it.
- Verify on the surface the user picked: headings, lists, tables, and code inside the container should be styled with no classes on the content itself.
- Docs: ${locationOrigin()}/docs/typeset`);

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
			: "isolate flex max-h-[calc(100vh-16rem)] w-full flex-col overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/10"}
	>
		<Tabs.Root bind:value={tab} class="flex min-h-0 flex-1 flex-col gap-0">
			<div class="flex items-center justify-between gap-2 border-b px-4 py-3">
				<Tabs.List>
					<Tabs.Trigger value="docs">Docs</Tabs.Trigger>
					<Tabs.Trigger value="prompt">Prompt</Tabs.Trigger>
				</Tabs.List>
				<Select.Root type="single" bind:value={framework}>
					<Select.Trigger size="sm" aria-label="Framework">
						{frameworkOptions.find((option) => option.value === framework)?.label}
					</Select.Trigger>
					<Select.Content align="end" preventScroll={false}>
						<Select.Group>
							{#each frameworkOptions as option (option.value)}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="no-scrollbar min-h-0 flex-1 scroll-fade overflow-y-auto p-4 md:p-6">
				<Tabs.Content value="docs" class="flex flex-col gap-6">
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">1. Create typeset.css</h3>
						<p class="text-sm leading-relaxed text-muted-foreground">
							Copy the stylesheet into a <code class="font-mono">typeset.css</code> file next to your
							main CSS file, then import it:
						</p>
						<Button
							variant="outline"
							size="sm"
							class="w-fit"
							disabled={!rawCss}
							onclick={() => rawCss && copy(rawCss, "css")}
						>
							{#if copied === "css"}<Check />{:else}<Copy />{/if} Copy typeset.css
						</Button>
						<pre
							class="overflow-x-auto rounded-lg bg-muted/60 p-3 font-mono text-sm leading-relaxed">@import "tailwindcss";
@import "./typeset.css";</pre>
					</section>
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">2. Add the fonts</h3>
						<PMInstall command={fontPackages} />
						<p class="text-sm leading-relaxed text-muted-foreground">
							Then import them in your CSS file:
						</p>
						<pre
							class="overflow-x-auto rounded-lg bg-muted/60 p-3 font-mono text-sm leading-relaxed">{fontCss}</pre>
					</section>
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">3. Create your custom typeset</h3>
						<pre
							class="overflow-x-auto rounded-lg bg-muted/60 p-3 font-mono text-sm leading-relaxed">{presetWithImports}</pre>
					</section>
					<section class="flex flex-col gap-2.5">
						<h3 class="text-sm font-medium">4. Wrap your content</h3>
						<pre
							class="overflow-x-auto rounded-lg bg-muted/60 p-3 font-mono text-sm leading-relaxed">{usage}</pre>
					</section>
				</Tabs.Content>
				<Tabs.Content value="prompt" class="flex flex-col gap-2.5">
					<p class="text-sm leading-relaxed text-muted-foreground">
						One prompt with your picks baked in. Copy it and paste it into your coding agent.
					</p>
					<pre
						class="max-h-102 overflow-y-auto rounded-lg bg-muted/60 p-3 font-mono text-sm leading-relaxed whitespace-pre-wrap">{prompt}</pre>
					<Button variant="outline" size="sm" class="w-fit" onclick={() => copy(prompt, "prompt")}
						>{#if copied === "prompt"}<Check />{:else}<Copy />{/if} Copy Prompt</Button
					>
				</Tabs.Content>
			</div>
		</Tabs.Root>
	</div>
	{#if !compact}
		<Button variant="link" size="sm" class="text-muted-foreground" href="/docs/typeset"
			>Read the docs</Button
		>
	{/if}
</div>
