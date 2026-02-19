<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Open Dialog</Dialog.Trigger>
	<Dialog.Content class="flex flex-col gap-0 p-0 sm:max-w-lg">
		<Dialog.Header class="contents space-y-0 *:data-[slot=dialog-description]:order-last *:data-[slot=dialog-description]:text-muted-foreground *:data-[slot=dialog-title]:font-semibold">
			<Dialog.Title class="order-first border-b px-6 py-4 text-base">
				Confirm action
			</Dialog.Title>
		</Dialog.Header>
		<div class="overflow-y-auto px-6 py-4">
			<Dialog.Description>
				This action will permanently remove the selected items. This cannot be undone.
			</Dialog.Description>
			<div class="mt-4 space-y-3 text-sm">
				<p>Please review the following items that will be deleted:</p>
				<ul class="list-disc pl-4 space-y-1 text-muted-foreground">
					<li>Project configuration files</li>
					<li>Associated media uploads</li>
					<li>Connected API integrations</li>
				</ul>
			</div>
		</div>
		<Dialog.Footer class="border-t px-6 py-4">
			<Dialog.Close class={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>
			<Button variant="destructive">Delete</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
