<script lang="ts">
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";

	const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
</script>

<div class="flex flex-col gap-6 md:flex-row">
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
					Make changes to your profile here. Click save when you&apos;re done.
				</Sheet.Description>
			</Sheet.Header>
			<div class="grid flex-1 auto-rows-min gap-6 px-4">
				<div class="grid gap-3">
					<Label for="sheet-demo-name">Name</Label>
					<Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
				</div>
				<div class="grid gap-3">
					<Label for="sheet-demo-username">Username</Label>
					<Input id="sheet-demo-username" defaultValue="@peduarte" />
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
	<div class="flex gap-2">
		{#each SHEET_SIDES as side (side)}
			<Sheet.Root>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="capitalize" {...props}>
							{side}
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content {side}>
					<Sheet.Header>
						<Sheet.Title>Edit profile</Sheet.Title>
						<Sheet.Description>
							Make changes to your profile here. Click save when you&apos;re done.
						</Sheet.Description>
					</Sheet.Header>
					<div class="overflow-y-auto px-4 text-sm">
						<h4 class="mb-4 text-lg font-medium leading-none">Lorem Ipsum</h4>
						{#each { length: 10 } as _, index (index)}
							<p class="mb-4 leading-normal">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
								ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
								aliquip ex ea commodo consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
								pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
								culpa qui officia deserunt mollit anim id est laborum.
							</p>
						{/each}
					</div>
					<Sheet.Footer>
						<Button type="submit">Save changes</Button>
						<Sheet.Close>
							{#snippet child({ props })}
								<Button variant="outline" {...props}>Cancel</Button>
							{/snippet}
						</Sheet.Close>
					</Sheet.Footer>
				</Sheet.Content>
			</Sheet.Root>
		{/each}
	</div>
</div>
