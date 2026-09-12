<script lang="ts">
	import NavigationButton from "./internal/questionnaire-navigation-button.svelte";
	import type { ComponentProps } from "svelte";
	let {
		children,
		...restProps
	}: Omit<ComponentProps<typeof NavigationButton>, "action"> = $props();
</script>

<NavigationButton action="previous" {...restProps}>{@render children?.()}</NavigationButton>
