<script lang="ts">
	import { cn } from "$lib/utils.js";

	const THEME_OPTIONS = [
		{ label: "Taupe", value: "theme-taupe" },
		{ label: "Neutral", value: "theme-neutral" },
		{ label: "Stone", value: "theme-stone" },
		{ label: "Zinc", value: "theme-zinc" },
		{ label: "Mauve", value: "theme-mauve" },
		{ label: "Olive", value: "theme-olive" },
		{ label: "Mist", value: "theme-mist" },
	] as const;

	const DEFAULT_THEME = "theme-taupe";

	let theme = $state<string>(DEFAULT_THEME);

	function applyThemeToPreviews(newTheme: string) {
		const previewElements = document.querySelectorAll<HTMLElement>(".preview");
		previewElements.forEach((element) => {
			THEME_OPTIONS.forEach((option) => {
				element.classList.remove(option.value);
			});
			element.classList.add(newTheme);
		});
	}

	$effect(() => {
		applyThemeToPreviews(theme);
	});
</script>

<div class="fixed inset-x-0 bottom-8 z-50 flex justify-center px-4">
	<div
		class="w-full max-w-[60vw] rounded-full border-0 bg-neutral-950/50 p-1.5 shadow-xl backdrop-blur-xl sm:max-w-fit"
	>
		<div class="no-scrollbar flex snap-x snap-mandatory items-center overflow-x-auto">
			{#each THEME_OPTIONS as option (option.value)}
				<button
					data-active={theme === option.value}
					type="button"
					onclick={() => {
						theme = option.value;
					}}
					class={cn(
						"shrink-0 snap-center rounded-full px-3 py-1.5 text-sm font-medium text-neutral-300 outline-hidden transition-colors select-none hover:text-neutral-100",
						theme === option.value && "bg-neutral-500 text-neutral-100"
					)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>
</div>
