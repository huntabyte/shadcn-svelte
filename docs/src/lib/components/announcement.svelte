<script lang="ts">
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import { ArrowRightIcon } from "@lucide/svelte";
</script>

<a
	href="/docs/changelog"
	class="cn({badgeVariants({ variant: 'secondary', class: 'bg-transparent' })}"
>
	<span class="size-2 rounded-full bg-blue-500" title="New"></span>
	New Components: Field, Input Group, Item and more <ArrowRightIcon />
</a>
