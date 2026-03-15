<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: "outline" })}>Edit profile</Popover.Trigger>
	<Popover.Content class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="leading-none font-medium">Profile</h4>
				<p class="text-muted-foreground text-sm">Update your profile information.</p>
			</div>
			<div class="grid gap-2">
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="name">Name</Label>
					<Input id="name" value="Pedro Duarte" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="username">Username</Label>
					<Input id="username" value="@peduarte" class="col-span-2 h-8" />
				</div>
			</div>
			<Button size="sm">Save changes</Button>
		</div>
	</Popover.Content>
</Popover.Root>
