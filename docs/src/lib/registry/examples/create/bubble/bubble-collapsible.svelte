<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

	const previewLength = 180;
	const isLong = text.length > previewLength;
	const preview = `${text.slice(0, previewLength)}...`;

	let open = $state(false);
</script>

<Example title="Collapsible">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Collapsible.Root bind:open>
			<Bubble.Root variant="muted" align="end">
				<Bubble.Content class="whitespace-pre-line">
					<div>{open || !isLong ? text : preview}</div>
					{#if isLong}
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Button variant="link" class="gap-1 p-0 text-muted-foreground" {...props}>
									{open ? "Show less" : "Show more"}
									<IconPlaceholder
										lucide="ChevronDownIcon"
										tabler="IconChevronDown"
										hugeicons="ArrowDown01Icon"
										phosphor="CaretDownIcon"
										remixicon="RiArrowDownSLine"
										data-icon="inline-end"
										class="group-data-open/button:rotate-180"
									/>
								</Button>
							{/snippet}
						</Collapsible.Trigger>
					{/if}
				</Bubble.Content>
			</Bubble.Root>
		</Collapsible.Root>
		<Bubble.Root variant="ghost">
			<Bubble.Content>
				<span class="whitespace-pre-wrap">
					{`Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Use this for content that needs the whole row.`}
				</span>
			</Bubble.Content>
		</Bubble.Root>
	</div>
</Example>
