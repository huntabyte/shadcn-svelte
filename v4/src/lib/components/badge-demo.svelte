<script lang="ts">
	import AlertCircle from "@lucide/svelte/icons/alert-circle";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Check from "@lucide/svelte/icons/check";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<div class="flex flex-col items-center gap-2">
	<div class="flex w-full flex-wrap gap-2">
		<Badge>Badge</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="outline">Outline</Badge>
		<Badge variant="outline">
			<Check />
			Badge
		</Badge>
		<Badge variant="destructive">
			<AlertCircle />
			Alert
		</Badge>
		<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
		<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">
			99
		</Badge>
		<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
			20+
		</Badge>
	</div>
	<div class="flex w-full flex-wrap gap-2">
		<Badge href="#">
			Link <ArrowRight />
		</Badge>
		<Badge href="#" variant="secondary">
			Link <ArrowRight />
		</Badge>
		<Badge href="#" variant="destructive">
			Link <ArrowRight />
		</Badge>
		<Badge href="#" variant="outline">
			Link <ArrowRight />
		</Badge>
	</div>
</div>
