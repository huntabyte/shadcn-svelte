<script lang="ts">
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { ArrowRightIcon } from "@lucide/svelte";
</script>

<a
	href="/docs/changelog"
	class="cn({badgeVariants({ variant: 'secondary', class: 'bg-transparent' })}"
>
	<span class="bg-svelte-orange size-2 rounded-full" title="New"></span>
	npx shadcn-svelte create <ArrowRightIcon />
</a>
