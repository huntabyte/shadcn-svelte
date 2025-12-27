<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";

	const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const;
</script>

<Example title="Sides">
	<div class="flex flex-wrap gap-2">
		{#each DRAWER_SIDES as side}
			<Drawer.Root
				direction={side === "bottom" ? undefined : (side as "top" | "right" | "left")}
			>
				<Drawer.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="capitalize" {...props}>{side}</Button>
					{/snippet}
				</Drawer.Trigger>
				<Drawer.Content
					class="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]"
				>
					<Drawer.Header>
						<Drawer.Title>Move Goal</Drawer.Title>
						<Drawer.Description>Set your daily activity goal.</Drawer.Description>
					</Drawer.Header>
					<div class="no-scrollbar overflow-y-auto px-4">
						{#each Array.from({ length: 10 }) as _, index}
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
					<Drawer.Footer>
						<Button>Submit</Button>
						<Drawer.Close>
							{#snippet child({ props })}
								<Button variant="outline" {...props}>Cancel</Button>
							{/snippet}
						</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/each}
	</div>
</Example>
