<script lang="ts">
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button variant="secondary" builders={[builder]}>Save</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[475px]">
		<Dialog.Header>
			<Dialog.Title>Save preset</Dialog.Title>
			<Dialog.Description>
				This will save the current playground state as a preset which you can access later
				or share with others.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="name">Name</Label>
				<Input id="name" />
			</div>
			<div class="grid gap-2">
				<Label for="description">Description</Label>
				<Input id="description" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit">Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
