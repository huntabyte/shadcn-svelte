<script lang="ts">
	import { onMount } from "svelte";
	import { mode, setMode } from "mode-watcher";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import ArrowLeftRight from "@lucide/svelte/icons/arrow-left-right";
	import CaseUpper from "@lucide/svelte/icons/case-upper";
	import AlignJustify from "@lucide/svelte/icons/align-justify";
	import MoveVertical from "@lucide/svelte/icons/move-vertical";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Metadata from "$lib/components/metadata.svelte";
	import Control from "$lib/features/typeset/control.svelte";
	import DocsPanel from "$lib/features/typeset/docs-panel.svelte";
	import MainMenu from "$lib/features/typeset/main-menu.svelte";
	import GetCodeDrawer from "$lib/features/typeset/get-code-drawer.svelte";
	import CtaMobile from "$lib/components/cta-mobile.svelte";
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
	let customizerAnchor = $state<HTMLElement | null>(null);
	let pickerScroll = $state<HTMLElement | null>(null);

	const fontOptions = FONTS.map((font) => ({ value: font.id, label: font.label }));
	const fontGroups = (["sans", "serif", "mono"] as const).map((type) => ({
		label: type === "sans" ? "Sans" : type === "serif" ? "Serif" : "Mono",
		options: FONTS.filter((font) => font.type === type).map((font) => ({
			value: font.id,
			label: font.label,
		})),
	}));
	const headingOptions = $derived([
		{
			value: "inherit",
			label: findFont(typeset.params.body)?.label ?? "Body font",
		},
		...fontOptions,
	]);
	const bodyFont = $derived(findFont(typeset.params.body));
	const headingFont = $derived(
		typeset.params.heading === "inherit" ? bodyFont : findFont(typeset.params.heading)
	);
	const monoFont = $derived(findFont(typeset.params.mono));
	let previewSrc = $state(
		serializeTypesetParams(`/preview/typeset/${typeset.params.item}`, typeset.params)
	);
	const openInNewTabHref = $derived(
		serializeTypesetParams(`/preview/typeset/${typeset.params.item}`, typeset.params)
	);
	let previewItem = typeset.params.item;

	function sendPreviewParams() {
		iframe?.contentWindow?.postMessage(
			{ type: "typeset-params", data: { ...typeset.params } },
			typeof window === "undefined" ? "*" : window.location.origin
		);
	}

	function toggleTheme() {
		setMode(mode.current === "dark" ? "light" : "dark");
	}

	function handleShortcut(event: KeyboardEvent) {
		if (
			(event.target instanceof HTMLElement && event.target.isContentEditable) ||
			event.target instanceof HTMLInputElement ||
			event.target instanceof HTMLTextAreaElement ||
			event.target instanceof HTMLSelectElement
		)
			return;
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
			if (event.origin !== window.location.origin || event.source !== iframe?.contentWindow)
				return;
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
		const params = { ...typeset.params };
		if (params.item !== previewItem) {
			previewItem = params.item;
			previewSrc = serializeTypesetParams(`/preview/typeset/${params.item}`, params);
			return;
		}
		sendPreviewParams();
	});
</script>

<Metadata title="Typeset" description="Typography for markdown you don't control." />

<div
	class="section-soft relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]"
>
	<div
		data-slot="designer"
		class="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
	>
		<DocsPanel {typeset} />

		<div class="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-(--gap) self-stretch">
			<div class="relative z-20 w-full">
				<CtaMobile showOnDesktop />
			</div>
			<div
				class="bg-background ring-foreground/10 relative isolate flex min-h-0 w-full flex-1 flex-col self-stretch overflow-hidden rounded-2xl ring-1"
			>
				<iframe
					bind:this={iframe}
					src={previewSrc}
					title="typeset preview"
					class="min-h-0 w-full flex-1"
					onload={sendPreviewParams}
				></iframe>
				<div
					class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-1.5"
				>
					<div
						class="dark bg-card/90 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl"
					>
						{#each CONTENT_OPTIONS as option, index (option.value)}
							<button
								type="button"
								title={option.label}
								data-active={typeset.params.item === option.value}
								class="text-muted-foreground hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-medium transition-colors"
								onclick={() => typeset.update({ item: option.value })}
								>{String(index + 1).padStart(2, "0")}</button
							>
						{/each}
					</div>
					<div
						class="dark bg-card/90 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl"
					>
						<Button
							href={openInNewTabHref}
							target="_blank"
							rel="noreferrer"
							variant="ghost"
							size="sm"
							class="text-muted-foreground hover:text-foreground h-7 cursor-pointer rounded-lg px-2.5 text-xs font-medium transition-colors"
						>
							<ExternalLink class="size-3.5 md:hidden" />
							<span class="max-md:sr-only">Open in New Tab</span>
						</Button>
					</div>
				</div>
			</div>
		</div>

		<Card.Root
			bind:ref={customizerAnchor}
			class="dark bg-card/90 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl backdrop-blur-xl md:w-(--customizer-width)"
			size="sm"
		>
			<Card.Header class="hidden items-center justify-between gap-2 border-b md:flex">
				<MainMenu {typeset} />
			</Card.Header>
			<Card.Content
				bind:ref={pickerScroll}
				data-slot="picker-scroll"
				class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden max-md:px-0 md:overflow-y-auto"
			>
				<div class="flex flex-row gap-2.5 py-px max-md:px-3 md:flex-col md:gap-3.25">
					<Control
						{typeset}
						param="measure"
						label="Measure"
						options={TYPESET_MEASURES}
						icon={ArrowLeftRight}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
						class="max-[28rem]:hidden"
					/>
					<div class="bg-border -mx-3 my-1 hidden h-px md:block"></div>
					<Control
						{typeset}
						param="heading"
						label="Heading"
						options={headingOptions}
						groups={fontGroups}
						preview={headingFont?.value}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
					/>
					<Control
						{typeset}
						param="body"
						label="Body"
						options={fontOptions}
						groups={fontGroups}
						preview={bodyFont?.value}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
					/>
					<Control
						{typeset}
						param="mono"
						label="Mono"
						options={fontOptions}
						groups={fontGroups}
						preview={monoFont?.value}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
					/>
					<div class="bg-border -mx-3 my-1 hidden h-px md:block"></div>
					<Control
						{typeset}
						param="scale"
						label="Size"
						options={TYPESET_SIZES}
						icon={CaseUpper}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
					/>
					<Control
						{typeset}
						param="leading"
						label="Leading"
						options={TYPESET_LEADINGS}
						icon={AlignJustify}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
					/>
					<Control
						{typeset}
						param="flow"
						label="Flow"
						options={TYPESET_FLOWS}
						icon={MoveVertical}
						anchor={customizerAnchor}
						scrollContainer={pickerScroll}
					/>
					<div aria-hidden="true" class="w-0.5 shrink-0 md:hidden"></div>
				</div>
			</Card.Content>
			<Card.Footer
				class="flex min-w-0 flex-row-reverse gap-2 border-t md:flex-col md:**:[button]:w-full"
			>
				<Button
					variant="outline"
					class="min-w-0 flex-1 bg-transparent md:flex-none"
					onclick={() => typeset.shuffle()}>Shuffle</Button
				>
				<GetCodeDrawer
					{typeset}
					class="hover:bg-muted! min-w-0 flex-1 touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none md:flex-none xl:hidden pointer-coarse:h-10!"
				/>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
