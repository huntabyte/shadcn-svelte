<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	const SNAP_POINTS = ["496px", 1];

	let snapPoint = $state<string | number | null>(SNAP_POINTS[0]);
</script>

<Drawer.Root showSwipeHandle snapPoints={SNAP_POINTS} bind:activeSnapPoint={snapPoint}>
	<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>Open Snap Drawer</Drawer.Trigger>
	<Drawer.Content class="h-full data-[vaul-drawer-direction=bottom]:max-h-[97%]">
		<Drawer.Header>
			<Drawer.Title>Snap points</Drawer.Title>
			<Drawer.Description>
				Drag the drawer to snap between a compact peek and a near full-height view.
			</Drawer.Description>
		</Drawer.Header>
		<div class="flex-1 p-4">
			<div class="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full"></div>
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants()}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
