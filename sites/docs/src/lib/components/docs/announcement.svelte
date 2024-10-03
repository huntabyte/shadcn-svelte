<script lang="ts">
	import PieChart from "lucide-svelte/icons/pie-chart";
	import ArrowRightIcon from "lucide-svelte/icons/arrow-right";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
</script>

<a href="/docs/changelog" class="group inline-flex items-center px-0.5 text-sm font-medium">
	<PieChart class="size-4" />
	<Separator class="mx-2 h-4" orientation="vertical" />
	<span class="underline-offset-4 group-hover:underline"> npx shadcn-svelte init </span>
	<ArrowRightIcon class="ml-1 size-4" />
</a>
