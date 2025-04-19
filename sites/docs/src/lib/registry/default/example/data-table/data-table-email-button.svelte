<script lang="ts">
	import type { ComponentProps } from "svelte";
	import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
	import { Button } from "$lib/registry/default/ui/button/index.js";

	let { variant = "ghost", ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
	Email
	<ArrowUpDown class="ml-2 size-4" />
</Button>
