<script lang="ts">
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
</script>

<a href="/docs/components" class={cn(badgeVariants({ variant: "secondary", class: "bg-muted" }))}>
	Ledger is the one style, light and dark <ArrowRightIcon />
</a>
