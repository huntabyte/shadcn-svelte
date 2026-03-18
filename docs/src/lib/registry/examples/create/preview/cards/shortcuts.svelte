<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<Card.Root>
	<Card.Content>
		<div class="flex flex-col gap-3">
			<div class="text-sm font-medium">Shortcuts</div>
			<div class="flex flex-col gap-2">
				<div class="text-muted-foreground flex items-center justify-between text-sm">
					<span>Search</span>
					<div class="flex gap-1">
						<Kbd>⌘</Kbd>
						<Kbd>K</Kbd>
					</div>
				</div>
				<Separator />
				<div class="text-muted-foreground flex items-center justify-between text-sm">
					<span>Quick Actions</span>
					<div class="flex gap-1">
						<Kbd>⌘</Kbd>
						<Kbd>J</Kbd>
					</div>
				</div>
				<Separator />
				<div class="text-muted-foreground flex items-center justify-between text-sm">
					<span>New File</span>
					<div class="flex gap-1">
						<Kbd>⌘</Kbd>
						<Kbd>N</Kbd>
					</div>
				</div>
				<Separator />
				<div class="text-muted-foreground flex items-center justify-between text-sm">
					<span>Save</span>
					<div class="flex gap-1">
						<Kbd>⌘</Kbd>
						<Kbd>S</Kbd>
					</div>
				</div>
				<Separator />
				<div class="text-muted-foreground flex items-center justify-between text-sm">
					<span>Toggle Sidebar</span>
					<div class="flex gap-1">
						<Kbd>⌘</Kbd>
						<Kbd>B</Kbd>
					</div>
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
