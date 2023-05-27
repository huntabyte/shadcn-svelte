<script lang="ts">
	import { Plus } from "lucide-svelte";
	import { Button } from "$components/ui/button";
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from "$components/ui/tooltip";
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			<Button variant="outline" class="w-10 rounded-full p-0">
				<Plus class="h-4 w-4" />
				<span class="sr-only">Add</span>
			</Button>
		</TooltipTrigger>
		<TooltipContent>
			<p>Add to library</p>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
