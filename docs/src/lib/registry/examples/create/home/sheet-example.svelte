<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
</script>

<Example title="Sheet">
	<div class="flex gap-2">
		{#each SHEET_SIDES as side (side)}
			<Sheet.Root>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button variant="secondary" class="flex-1 capitalize" {...props}>
							{side}
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content
					{side}
					class="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
				>
					<Sheet.Header>
						<Sheet.Title>Edit profile</Sheet.Title>
						<Sheet.Description>
							Make changes to your profile here. Click save when you&apos;re done.
						</Sheet.Description>
					</Sheet.Header>
					<div class="overflow-y-auto px-4 text-sm">
						{#each Array.from({ length: 10 }) as _, index (index)}
							<p
								class="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal"
							>
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
</Example>
