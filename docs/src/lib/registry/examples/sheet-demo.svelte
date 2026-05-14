<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Sheet.Root>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Open</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid flex-1 auto-rows-min gap-6 px-4">
			<div class="grid gap-3">
				<Label for="sheet-demo-name">Name</Label>
				<Input id="sheet-demo-name" value="Pedro Duarte" />
			</div>
			<div class="grid gap-3">
				<Label for="sheet-demo-username">Username</Label>
				<Input id="sheet-demo-username" value="@peduarte" />
			</div>
		</div>
		<Sheet.Footer>
			<Button type="submit">Save changes</Button>
			<Sheet.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Close</Button>
				{/snippet}
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
