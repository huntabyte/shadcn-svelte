<script lang="ts">
	import { ArrowRightIcon } from "@lucide/svelte";
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
</script>

<a href="/docs/typeset" class={cn(badgeVariants({ variant: "secondary", class: "bg-muted" }))}>
	Introducing shadcn-svelte/typeset <ArrowRightIcon />
</a>
