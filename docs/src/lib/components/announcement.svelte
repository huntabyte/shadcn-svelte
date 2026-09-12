<script lang="ts">
	import { ArrowRightIcon } from "@lucide/svelte";
	import { cn } from "cn";
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
</script>

<a href="/docs/changelog" class={cn(badgeVariants({ variant: "secondary", class: "bg-muted" }))}>
	Introducing Rhea <ArrowRightIcon />
</a>
