<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	const isMobile = new IsMobile();
	const direction = $derived(isMobile.current ? "bottom" : "right");
</script>

{#snippet placeholder()}
	<div class="flex-1 p-4">
		<div
			class="bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:aspect-video group-data-[vaul-drawer-direction=bottom]/drawer-content:w-full group-data-[vaul-drawer-direction=right]/drawer-content:size-full"
		></div>
	</div>
{/snippet}

<Drawer.Root {direction}>
	<Drawer.Trigger class={buttonVariants({ variant: "secondary" })}>Open Drawer</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Drawer</Drawer.Title>
			<Drawer.Description>Open another drawer from the same direction.</Drawer.Description>
		</Drawer.Header>
		{@render placeholder()}
		<Drawer.Footer>
			<Drawer.NestedRoot {direction}>
				<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
					Open Nested Drawer
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Nested Drawer</Drawer.Title>
						<Drawer.Description>
							The parent drawer stays mounted behind this one.
						</Drawer.Description>
					</Drawer.Header>
					{@render placeholder()}
					<Drawer.Footer>
						<Drawer.NestedRoot {direction}>
							<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
								Open Third Drawer
							</Drawer.Trigger>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title>Third Drawer</Drawer.Title>
									<Drawer.Description>Two drawers are stacked behind this one.</Drawer.Description>
								</Drawer.Header>
								{@render placeholder()}
								<Drawer.Footer>
									<Drawer.NestedRoot {direction}>
										<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
											Open Fourth Drawer
										</Drawer.Trigger>
										<Drawer.Content>
											<Drawer.Header>
												<Drawer.Title>Fourth Drawer</Drawer.Title>
												<Drawer.Description>
													This is the frontmost drawer in the stack.
												</Drawer.Description>
											</Drawer.Header>
											{@render placeholder()}
											<Drawer.Footer>
												<Drawer.Close class={buttonVariants({ variant: "outline" })}>
													Close
												</Drawer.Close>
											</Drawer.Footer>
										</Drawer.Content>
									</Drawer.NestedRoot>
									<Drawer.Close class={buttonVariants({ variant: "outline" })}>Close</Drawer.Close>
								</Drawer.Footer>
							</Drawer.Content>
						</Drawer.NestedRoot>
						<Drawer.Close class={buttonVariants({ variant: "outline" })}>Close</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.NestedRoot>
			<Drawer.Close class={buttonVariants({ variant: "outline" })}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
