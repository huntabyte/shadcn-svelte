<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Open Dialog</Dialog.Trigger>
	<Dialog.Content class="flex flex-col gap-0 p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
		<Dialog.Header
			class="*:data-[slot=dialog-description]:text-muted-foreground contents space-y-0 *:data-[slot=dialog-description]:order-last *:data-[slot=dialog-title]:font-semibold"
		>
			<Dialog.Title class="order-first border-b px-6 py-4 text-base">
				Terms of Service
			</Dialog.Title>
		</Dialog.Header>
		<div class="max-h-[60vh] overflow-y-auto px-6 py-4">
			<Dialog.Description class="sr-only">Terms of service content</Dialog.Description>
			{#each { length: 8 } as _, i (i)}
				<div class="mb-4">
					<h3 class="mb-1 font-semibold">Section {i + 1}</h3>
					<p class="text-muted-foreground text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</p>
				</div>
			{/each}
		</div>
		<Dialog.Footer class="border-t px-6 py-4">
			<Dialog.Close class={buttonVariants({ variant: "outline" })}>Decline</Dialog.Close>
			<Button>Accept</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
