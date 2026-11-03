<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Drawer.Root direction="left">
	<Drawer.Trigger class={buttonVariants({ variant: "secondary" })}>Open Left Drawer</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Move Goal</Drawer.Title>
			<Drawer.Description>Set your daily activity goal.</Drawer.Description>
		</Drawer.Header>
		<div class="flex-1 p-4">
			<div class="size-full rounded-2xl bg-muted"></div>
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants()}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
