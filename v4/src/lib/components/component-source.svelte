<script lang="ts">
	import type { Snippet } from "svelte";
	import CodeCollapsibleWrapper from "./code-collapsible-wrapper.svelte";

	let {
		...restProps
	}: {
		children?: Snippet;
		class?: string;
		// used for grabbing the source code in unified pipeline
		name?: string;
	} = $props();
</script>

<CodeCollapsibleWrapper {...restProps} />
