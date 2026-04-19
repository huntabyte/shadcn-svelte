<script lang="ts">
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import { ArrowRightIcon } from "@lucide/svelte";
</script>

<a href="/sera" class={cn(badgeVariants({ variant: "secondary", class: "bg-muted" }))}>
	Introducing Sera <ArrowRightIcon />
</a>
