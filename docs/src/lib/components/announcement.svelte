<script lang="ts">
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import { ArrowRightIcon } from "@lucide/svelte";
</script>

<a
	href="/docs/components/message"
	class={cn(badgeVariants({ variant: "secondary", class: "bg-muted" }))}
>
	Components for Chat Interfaces <ArrowRightIcon />
</a>
