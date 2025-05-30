<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Tabs.Root> = $props();
</script>

<Tabs.Root class={cn("relative mt-6 w-full", className)} {...restProps} />
