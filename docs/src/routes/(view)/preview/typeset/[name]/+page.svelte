<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { CHAT_QUESTION } from "$lib/features/typeset/fixtures/chat.js";
	import { FIXTURES, CONTENT_OPTIONS, type FixtureName } from "$lib/features/typeset/fixtures/index.js";
	import {
		DEFAULT_TYPESET_PARAMS,
		TYPESET_MEASURES,
		findFont,
		type TypesetParams,
	} from "$lib/features/typeset/typeset.svelte.js";
	import "$lib/styles/typeset.css";

	const name = $derived(
		CONTENT_OPTIONS.some((option) => option.value === page.params.name)
			? (page.params.name as FixtureName)
			: "docs"
	);
	let params = $state<TypesetParams>({ ...DEFAULT_TYPESET_PARAMS });
	const bodyFont = $derived(findFont(params.body)?.value);
	const headingFont = $derived(
		params.heading === "inherit" ? bodyFont : findFont(params.heading)?.value
	);
	const monoFont = $derived(findFont(params.mono)?.value);
	const measure = $derived(
		TYPESET_MEASURES.find((option) => option.value === params.measure)?.width ?? "37em"
	);
	const content = $derived(FIXTURES[name]);

	onMount(() => {
		const query = page.url.searchParams;
		for (const key of Object.keys(DEFAULT_TYPESET_PARAMS) as (keyof TypesetParams)[]) {
			const value = query.get(key);
			if (value) (params as Record<string, string>)[key] = value;
		}
		params = { ...params, item: name };

		const onMessage = (event: MessageEvent) => {
			if (event.origin === window.location.origin && event.data?.type === "typeset-params") {
				params = { ...params, ...event.data.data };
			}
		};
		const onKeydown = (event: KeyboardEvent) => {
			if (
				(event.target instanceof HTMLElement && event.target.isContentEditable) ||
				event.target instanceof HTMLInputElement ||
				event.target instanceof HTMLTextAreaElement ||
				event.target instanceof HTMLSelectElement
			) return;
			const key = event.key.toLowerCase();
			let command = "";
			if (!event.metaKey && !event.ctrlKey && !event.altKey && key === "r") command = event.shiftKey ? "reset" : "shuffle";
			else if (!event.metaKey && !event.ctrlKey && !event.altKey && key === "d") command = "toggle-theme";
			else if ((event.metaKey || event.ctrlKey) && key === "z") command = event.shiftKey ? "redo" : "undo";
			if (command) {
				event.preventDefault();
				window.parent.postMessage({ type: "typeset-command", command }, window.location.origin);
			}
		};
		window.addEventListener("message", onMessage);
		document.addEventListener("keydown", onKeydown);
		return () => {
			window.removeEventListener("message", onMessage);
			document.removeEventListener("keydown", onKeydown);
		};
	});
</script>

<svelte:head><title>Typeset preview</title></svelte:head>

<div
	class="flex min-h-svh justify-center px-6 pt-8 pb-24 md:pt-24 md:pb-32"
	style="font-family: {bodyFont}; --font-heading: {headingFont}; --font-mono: {monoFont};"
>
	<div class="preview-params w-full" style="font-size: {params.scale}px; max-width: {measure};">
		{#if name === "chat"}
			<div class="flex w-full flex-col gap-10">
				<div class="bg-muted ml-auto w-fit max-w-[65%] rounded-3xl px-4 py-2.5">{CHAT_QUESTION}</div>
				<div
					class="typeset w-full"
					style="--typeset-font-body: {bodyFont}; --typeset-font-heading: {headingFont}; --typeset-font-mono: {monoFont}; --typeset-leading: {params.leading}; --typeset-flow: {params.flow};"
				>{@html content}</div>
			</div>
		{:else}
			<div
				class="typeset w-full"
				style="--typeset-font-body: {bodyFont}; --typeset-font-heading: {headingFont}; --typeset-font-mono: {monoFont}; --typeset-leading: {params.leading}; --typeset-flow: {params.flow};"
			>{@html content}</div>
		{/if}
	</div>
</div>
