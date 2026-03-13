<script lang="ts">
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import { ArrowRightIcon } from "@lucide/svelte";
</script>

<a href="/docs/changelog" class={cn(badgeVariants({ variant: "secondary", class: "bg-muted" }))}>
	shadcn-svelte/skills, presets and more <ArrowRightIcon />
</a>
