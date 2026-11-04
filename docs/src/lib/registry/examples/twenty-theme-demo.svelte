<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const modes = [
		{ name: "Light", class: "light" },
		{ name: "Dark", class: "dark" },
	];
</script>

<div class="grid w-full gap-4 md:grid-cols-2">
	{#each modes as mode (mode.name)}
		<div
			class="theme-twenty style-ledger {mode.class} rounded-lg border bg-background p-4 text-foreground"
		>
			<Card.Root>
				<Card.Header>
					<Card.Title>{mode.name}</Card.Title>
					<Card.Description>Twenty tokens on Ledger</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col gap-4">
					<Input placeholder="Search records" />
					<div class="flex flex-col gap-2">
						<p class="text-xs text-muted-foreground">Buttons, 32 px</p>
						<div class="flex items-center gap-2">
							<Button>Save</Button>
							<Button variant="outline">Cancel</Button>
						</div>
						<p class="text-xs text-muted-foreground">Small, 24 px</p>
						<div class="flex items-center gap-2">
							<Button size="sm">Save</Button>
							<Button size="sm" variant="outline">Cancel</Button>
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<p class="text-xs text-muted-foreground">Badges: tones for tags and status, default for counts</p>
						<div class="flex flex-wrap items-center gap-2">
							<Badge tone="blue">Customer</Badge>
							<Badge tone="gray">Lead</Badge>
							<Badge tone="green">Active</Badge>
							<Badge tone="orange">Pending</Badge>
							<Badge tone="red">Overdue</Badge>
							<Badge>12</Badge>
						</div>
					</div>
					<div class="flex items-center gap-2 text-sm">
						<Switch id="notify-{mode.name}" />
						<label for="notify-{mode.name}">Notify me</label>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{/each}
</div>
