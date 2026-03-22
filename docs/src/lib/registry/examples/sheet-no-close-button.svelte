<script lang="ts">
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: "outline" })}>Open</Sheet.Trigger>
	<Sheet.Content showCloseButton={false}>
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid flex-1 auto-rows-min gap-6 px-4">
			<div class="grid gap-3">
				<Label for="sheet-no-close-name">Name</Label>
				<Input id="sheet-no-close-name" value="Pedro Duarte" />
			</div>
			<div class="grid gap-3">
				<Label for="sheet-no-close-username">Username</Label>
				<Input id="sheet-no-close-username" value="@peduarte" />
			</div>
		</div>
		<Sheet.Footer>
			<Button type="submit">Save changes</Button>
			<Sheet.Close class={buttonVariants({ variant: "outline" })}>Close</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
