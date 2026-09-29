<script lang="ts">
	import { page } from "$app/state";
	import type { ResolvedPathname } from "$app/types";
	import { cn } from "$lib/utils.js";

	// These states used to be expressed with `group-has-*/body` utilities that inspect the page
	// content (`body:has(.section-soft)`, `body:has([data-slot=docs])`, ...). A `:has()` anchored on
	// <body> with a descendant subject makes Chrome restyle the _entire document_ on every DOM
	// mutation anywhere in the page, which cost ~200ms per click in the interactive Field examples.
	// Instead, we'll just derive the same states from the route instead.
	const pathname = $derived(page.url.pathname);
	const isDocs = $derived(
		pathname === ("/docs" as ResolvedPathname) || pathname.startsWith("/docs/")
	);
	const isSoftSection = $derived(
		["/blocks", "/charts", "/examples", "/themes"].some(
			(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
		)
	);
</script>

<footer
	class={cn(
		"3xl:fixed:bg-transparent",
		isSoftSection ? "bg-surface/40 dark:bg-surface/40" : "dark:bg-transparent",
		isDocs && "hidden"
	)}
>
	<div class="container-wrapper px-4 xl:px-6">
		<div class="flex h-(--footer-height) items-center justify-between">
			<div class="w-full px-1 text-center text-xs leading-loose text-muted-foreground sm:text-sm">
				Built by
				<a
					href="https://x.com/shadcn"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					shadcn
				</a>. Ported to Svelte by
				<a
					href="https://x.com/huntabyte"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4">Huntabyte</a
				>
				&
				<a
					href="https://github.com/adriangonz97"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					CokaKoala
				</a>.
			</div>
		</div>
	</div>
</footer>
