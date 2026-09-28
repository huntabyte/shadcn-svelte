<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Drawer.Root modal={false} dismissible={false} direction="right">
	<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>Non Modal</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Non Modal Drawer</Drawer.Title>
		</Drawer.Header>
		<div class="flex-1 p-4">
			<div class="size-full rounded-2xl bg-muted"></div>
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants()}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
