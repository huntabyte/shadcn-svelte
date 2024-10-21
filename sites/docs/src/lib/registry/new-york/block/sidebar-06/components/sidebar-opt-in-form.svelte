<script lang="ts">
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as Sidebar from "$lib/registry/new-york/ui/sidebar/index.js";
</script>

<Card.Root class="shadow-none">
	<form>
		<Card.Header class="p-4 pb-0">
			<Card.Title class="text-sm">Subscribe to our newsletter</Card.Title>
			<Card.Description>
				Opt-in to receive updates and news about the sidebar.
			</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-2.5 p-4">
			<Sidebar.Input type="email" placeholder="Email" />
			<Button
				class="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
				size="sm"
			>
				Subscribe
			</Button>
		</Card.Content>
	</form>
</Card.Root>
