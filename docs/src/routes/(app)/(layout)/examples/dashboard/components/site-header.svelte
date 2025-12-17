<script lang="ts">
	import CirclePlusFilledIcon from "@tabler/icons-svelte/icons/circle-plus-filled";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<header
	class="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<h1 class="text-base font-medium">Documents</h1>
		<div class="ms-auto flex items-center gap-2">
			<Button size="sm" class="hidden h-7 sm:flex">
				<CirclePlusFilledIcon />
				<span>Quick Create</span>
			</Button>
		</div>
	</div>
</header>
