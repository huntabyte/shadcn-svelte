<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Drawer.Root showSwipeHandle>
	<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>Swipe Handle</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Swipe handle</Drawer.Title>
			<Drawer.Description>Drag the handle to close the drawer.</Drawer.Description>
		</Drawer.Header>
		<div class="flex-1 p-4">
			<div class="h-80 w-full rounded-2xl bg-muted"></div>
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants()}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
