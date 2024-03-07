<script lang="ts">
	import AtSign from "lucide-svelte/icons/at-sign";
	import Bell from "lucide-svelte/icons/bell";
	import BellOff from "lucide-svelte/icons/bell-off";
	import * as Card from "$lib/registry/default/ui/card/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Choose what you want to be notified about.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-1 p-1.5">
		<div
			class="flex items-center space-x-4 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
		>
			<Bell class="h-5 w-5" />
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none">Everything</p>
				<p class="text-sm text-muted-foreground">Email digest, mentions & all activity.</p>
			</div>
		</div>
		<div class="flex items-center space-x-4 rounded-md bg-accent p-2 text-accent-foreground">
			<AtSign class="h-5 w-5" />
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none">Available</p>
				<p class="text-sm text-muted-foreground">Only mentions and comments.</p>
			</div>
		</div>
		<div
			class="flex items-center space-x-4 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
		>
			<BellOff class="h-5 w-5" />
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none">Ignoring</p>
				<p class="text-sm text-muted-foreground">Turn off all notifications.</p>
			</div>
		</div>
	</Card.Content>
</Card.Root>
