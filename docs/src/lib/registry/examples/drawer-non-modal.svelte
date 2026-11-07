<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Drawer.Root modal={false} direction="right">
	<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>Non Modal</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Non Modal Drawer</Drawer.Title>
		</Drawer.Header>
		<div class="flex-1 p-4">
			<div class="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full"></div>
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants()}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
