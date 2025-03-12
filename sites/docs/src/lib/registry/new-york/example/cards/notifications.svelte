<script lang="ts">
	import AtSign from "@lucide/svelte/icons/at-sign";
	import Bell from "@lucide/svelte/icons/bell";
	import BellOff from "@lucide/svelte/icons/bell-off";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Choose what you want to be notified about.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-1 p-1.5">
		<div
			class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-4 rounded-md p-2"
		>
			<Bell class="size-5" />
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none">Everything</p>
				<p class="text-muted-foreground text-sm">Email digest, mentions & all activity.</p>
			</div>
		</div>
		<div class="bg-accent text-accent-foreground flex items-center space-x-4 rounded-md p-2">
			<AtSign class="size-5" />
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none">Available</p>
				<p class="text-muted-foreground text-sm">Only mentions and comments.</p>
			</div>
		</div>
		<div
			class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-4 rounded-md p-2"
		>
			<BellOff class="size-5" />
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none">Ignoring</p>
				<p class="text-muted-foreground text-sm">Turn off all notifications.</p>
			</div>
		</div>
	</Card.Content>
</Card.Root>
