<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";

	const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;
	const previewLength = 180;
	const preview = `${text.slice(0, previewLength)}...`;
	let isOpen = $state(false);
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root variant="muted">
		<Bubble.Content>How can I help you today?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="muted" align="end">
		<Bubble.Content class="whitespace-pre-line">
			<Collapsible.Root bind:open={isOpen}>
				<div>{isOpen ? text : preview}</div>
				<Collapsible.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="link" class="text-muted-foreground gap-1 p-0">
							{isOpen ? "Show less" : "Show more"}
							<ChevronDownIcon class={isOpen ? "rotate-180" : undefined} />
						</Button>
					{/snippet}
				</Collapsible.Trigger>
			</Collapsible.Root>
		</Bubble.Content>
	</Bubble.Root>
</div>
