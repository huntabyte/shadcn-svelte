<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { ComponentProps } from "svelte";

	let { variant = "ghost", size = "icon-sm", ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button data-slot="attachment-action" {variant} {size} {...restProps} />
