<script lang="ts">
	import { onMount, type Component } from "svelte";
	import LanguagePreview from "$lib/components/language-selector/language-preview.svelte";
	import CalendarWithTimezone from "$lib/registry/examples/calendar-with-timezone.svelte";
	import HijriCalendarDemo from "$lib/registry/examples/hijri-calendar-demo.svelte";
	import PersianCalendarDemo from "$lib/registry/examples/persian-calendar-demo.svelte";
	import CalendarNumerals from "./calendar-numerals.svelte";
	const examples = import.meta.glob<{ default: Component }>(
		"../../../src/lib/registry/examples/*-rtl.svelte"
	);
	let Example = $state<Component | null>(null);
	const name = new URLSearchParams(window.location.search).get("example");
	onMount(async () => {
		if (name === "calendar-numerals") {
			Example = CalendarNumerals;
			return;
		}
		if (name === "persian-calendar" || name === "hijri-calendar" || name === "calendar-timezone") {
			Example =
				name === "persian-calendar"
					? PersianCalendarDemo
					: name === "hijri-calendar"
						? HijriCalendarDemo
						: CalendarWithTimezone;
			return;
		}
		const load = examples[`../../../src/lib/registry/examples/${name}-rtl.svelte`];
		if (load) Example = (await load()).default;
	});
</script>

{#if Example && (name === "shimmer" || name === "persian-calendar" || name === "hijri-calendar" || name === "calendar-timezone" || name === "calendar-numerals")}<div
		data-testid="rtl-example"
		class={name !== "shimmer" ? "flex min-h-72 items-center justify-center p-10" : undefined}
	>
		<Example />
	</div>{:else if Example}<LanguagePreview fullPage={name === "sidebar"}
		><div class="flex min-h-72 items-center justify-center p-10" data-testid="rtl-example">
			<Example />
		</div></LanguagePreview
	>{/if}
