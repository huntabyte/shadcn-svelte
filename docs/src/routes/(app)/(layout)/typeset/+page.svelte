<script lang="ts">
	import { onMount } from "svelte";
	import { mode, setMode } from "mode-watcher";
	import Menu from "@lucide/svelte/icons/menu";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Metadata from "$lib/components/metadata.svelte";
	import Control from "$lib/features/typeset/control.svelte";
	import DocsPanel from "$lib/features/typeset/docs-panel.svelte";
	import {
		CONTENT_OPTIONS,
		FONTS,
		TYPESET_FLOWS,
		TYPESET_LEADINGS,
		TYPESET_MEASURES,
		TYPESET_SIZES,
		TypesetState,
		findFont,
		serializeTypesetParams,
	} from "$lib/features/typeset/typeset.svelte.js";

	const typeset = new TypesetState();
	let iframe: HTMLIFrameElement;
	let menuOpen = $state(false);
	let codeOpen = $state(false);

	const fontOptions = FONTS.map((font) => ({ value: font.id, label: font.label }));
	const headingOptions = $derived([
		{ value: "inherit", label: findFont(typeset.params.body)?.label ?? "Body font" },
		...fontOptions,
	]);
	const bodyFont = $derived(findFont(typeset.params.body));
	const headingFont = $derived(
		typeset.params.heading === "inherit" ? bodyFont : findFont(typeset.params.heading)
	);
	const monoFont = $derived(findFont(typeset.params.mono));
	const previewSrc = $derived(
		serializeTypesetParams(`/preview/typeset/${typeset.params.item}`, typeset.params)
	);

	function toggleTheme() {
		setMode(mode.current === "dark" ? "light" : "dark");
	}

	function handleShortcut(event: KeyboardEvent) {
		if (
			(event.target instanceof HTMLElement && event.target.isContentEditable) ||
			event.target instanceof HTMLInputElement ||
			event.target instanceof HTMLTextAreaElement ||
			event.target instanceof HTMLSelectElement
		) return;
		const key = event.key.toLowerCase();
		if ((event.metaKey || event.ctrlKey) && key === "z") {
			event.preventDefault();
			event.shiftKey ? typeset.redo() : typeset.undo();
		} else if (!event.metaKey && !event.ctrlKey && !event.altKey && key === "r") {
			event.preventDefault();
			event.shiftKey ? typeset.reset() : typeset.shuffle();
		} else if (!event.metaKey && !event.ctrlKey && !event.altKey && key === "d") {
			event.preventDefault();
			toggleTheme();
		}
	}

	onMount(() => {
		typeset.init();
		document.addEventListener("keydown", handleShortcut);
		const onMessage = (event: MessageEvent) => {
			if (event.origin !== window.location.origin || event.source !== iframe?.contentWindow) return;
			if (event.data?.type !== "typeset-command") return;
			const actions: Record<string, () => void> = {
				shuffle: () => typeset.shuffle(),
				reset: () => typeset.reset(),
				undo: () => typeset.undo(),
				redo: () => typeset.redo(),
				"toggle-theme": toggleTheme,
			};
			actions[event.data.command]?.();
		};
		window.addEventListener("message", onMessage);
		return () => {
			document.removeEventListener("keydown", handleShortcut);
			window.removeEventListener("message", onMessage);
		};
	});

	$effect(() => {
		iframe?.contentWindow?.postMessage(
			{ type: "typeset-params", data: { ...typeset.params } },
			typeof window === "undefined" ? "*" : window.location.origin
		);
	});
</script>

<Metadata title="Typeset" description="Typography for markdown you don't control." />

<div
	class="section-soft relative z-10 flex h-[calc(100svh-4rem)] min-h-[42rem] flex-1 flex-col overflow-hidden [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]"
>
	<div
		data-slot="designer"
		class="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
	>
		<DocsPanel {typeset} />

		<div class="bg-background ring-foreground/10 relative isolate flex size-full min-h-0 flex-1 overflow-hidden rounded-2xl ring-1">
			<iframe bind:this={iframe} src={previewSrc} title="typeset preview" class="size-full"></iframe>
			<div class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-1.5">
				<div class="dark bg-card/90 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl">
					{#each CONTENT_OPTIONS as option, index}
						<button
							type="button"
							title={option.label}
							data-active={typeset.params.item === option.value}
							class="text-muted-foreground hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-medium transition-colors"
							onclick={() => typeset.update({ item: option.value })}
						>{String(index + 1).padStart(2, "0")}</button>
					{/each}
				</div>
				<div class="dark bg-card/90 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl">
					<a
						href={previewSrc}
						target="_blank"
						rel="noreferrer"
						aria-label="Open in New Tab"
						class="text-muted-foreground hover:text-foreground flex h-7 items-center rounded-lg px-2.5"
					><ExternalLink class="size-3.5" /></a>
				</div>
			</div>
		</div>

		<Card.Root class="dark bg-card/90 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl backdrop-blur-xl md:w-(--customizer-width)" size="sm">
			<Card.Header class="relative hidden items-center justify-between gap-2 border-b md:flex">
				<button class="ring-foreground/10 flex w-full items-center justify-between gap-2 rounded-lg px-1.75 py-2 text-sm font-medium ring-1" onclick={() => menuOpen = !menuOpen}>
					Menu <Menu class="size-5" />
				</button>
				{#if menuOpen}
					<div class="bg-neutral-950/90 absolute top-12 left-[calc(100%+1.25rem)] z-50 w-52 rounded-xl p-1.5 text-sm text-neutral-100 shadow-xl ring-1 ring-neutral-800 backdrop-blur-xl">
						<button class="hover:bg-neutral-700 flex w-full rounded-lg px-2 py-1.5" onclick={() => { typeset.shuffle(); menuOpen = false; }}>Shuffle <span class="ml-auto text-neutral-400">R</span></button>
						<button class="hover:bg-neutral-700 flex w-full rounded-lg px-2 py-1.5" onclick={() => { toggleTheme(); menuOpen = false; }}>Light/Dark <span class="ml-auto text-neutral-400">D</span></button>
						<div class="my-1.5 h-px bg-neutral-700"></div>
						<button disabled={!typeset.canUndo} class="hover:bg-neutral-700 flex w-full rounded-lg px-2 py-1.5 disabled:opacity-50" onclick={() => { typeset.undo(); menuOpen = false; }}>Undo <span class="ml-auto text-neutral-400">⌘Z</span></button>
						<button disabled={!typeset.canRedo} class="hover:bg-neutral-700 flex w-full rounded-lg px-2 py-1.5 disabled:opacity-50" onclick={() => { typeset.redo(); menuOpen = false; }}>Redo <span class="ml-auto text-neutral-400">⇧⌘Z</span></button>
						<button class="hover:bg-neutral-700 flex w-full rounded-lg px-2 py-1.5" onclick={() => { typeset.reset(); menuOpen = false; }}>Reset <span class="ml-auto text-neutral-400">⇧R</span></button>
					</div>
				{/if}
			</Card.Header>
			<Card.Content class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden max-md:px-0 md:overflow-y-auto">
				<div class="flex flex-row gap-2.5 py-px max-md:px-3 md:flex-col md:gap-3.25">
					<Control typeset={typeset} param="measure" label="Measure" options={TYPESET_MEASURES} class="max-[28rem]:hidden" />
					<div class="bg-border my-1 hidden h-px md:block"></div>
					<Control typeset={typeset} param="heading" label="Heading" options={headingOptions} preview={headingFont?.value} />
					<Control typeset={typeset} param="body" label="Body" options={fontOptions} preview={bodyFont?.value} />
					<Control typeset={typeset} param="mono" label="Mono" options={fontOptions} preview={monoFont?.value} />
					<div class="bg-border my-1 hidden h-px md:block"></div>
					<Control typeset={typeset} param="scale" label="Size" options={TYPESET_SIZES} />
					<Control typeset={typeset} param="leading" label="Leading" options={TYPESET_LEADINGS} />
					<Control typeset={typeset} param="flow" label="Flow" options={TYPESET_FLOWS} />
					<div aria-hidden="true" class="w-0.5 shrink-0 md:hidden"></div>
				</div>
			</Card.Content>
			<Card.Footer class="flex min-w-0 flex-row-reverse gap-2 border-t md:flex-col md:**:[button]:w-full">
				<Button variant="outline" class="min-w-0 flex-1 bg-transparent md:flex-none" onclick={() => typeset.shuffle()}>Shuffle</Button>
				<Button variant="outline" class="min-w-0 flex-1 bg-transparent md:flex-none xl:hidden" onclick={() => codeOpen = true}>Get Code</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

{#if codeOpen}
	<div class="fixed inset-0 z-50 flex items-end bg-black/40 xl:hidden" role="presentation" onclick={() => codeOpen = false}>
		<div class="bg-background max-h-[85svh] w-full overflow-hidden rounded-t-2xl" role="dialog" aria-modal="true" aria-label="Get Code" tabindex="-1" onclick={(event) => event.stopPropagation()} onkeydown={(event) => event.stopPropagation()}>
			<div class="border-b p-4"><h2 class="font-semibold">Get Code</h2><p class="text-muted-foreground text-sm">Install typeset with the values you picked.</p></div>
			<DocsPanel {typeset} compact />
			<div class="border-t p-4"><Button variant="outline" class="w-full" onclick={() => codeOpen = false}>Done</Button></div>
		</div>
	</div>
{/if}
