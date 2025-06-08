<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
</script>

<Card.Root class="gap-2 py-4 shadow-none">
	<Card.Header class="px-4">
		<Card.Title class="text-sm">Subscribe to our newsletter</Card.Title>
		<Card.Description>Opt-in to receive updates and news about the sidebar.</Card.Description>
	</Card.Header>
	<Card.Content class="px-4">
		<form>
			<div class="grid gap-2.5">
				<Sidebar.Input type="email" placeholder="Email" />
				<Button
					class="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
					size="sm"
				>
					Subscribe
				</Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>
