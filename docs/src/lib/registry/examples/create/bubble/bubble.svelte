<script lang="ts">
	import { toast } from "svelte-sonner";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let open = $state(false);

	const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

	const previewLength = 180;
	const isLong = text.length > previewLength;
	const preview = `${text.slice(0, previewLength)}...`;

	const quickReplies = [
		{
			label: "I need help with my account.",
			message: "I need help with my account.",
		},
		{
			label: "I forgot my password.",
			message: "I forgot my password.",
		},
		{
			label: "I have another question. I'd like to talk to a human. Can you help me?",
			message: "I have another question.",
		},
	];
</script>

<ExampleWrapper>
	<Example title="Sizes">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Bubble.Root>
				<Bubble.Content>This is a one line bubble.</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root>
				<Bubble.Content>
					This bubble has multiple lines. It should wrap to the next line and you should
					see a different radius on the corners.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root>
				<Bubble.Content>
					<p>This bubble has multiple lines.</p>
					<p>
						It should wrap to the next line and you should see a different radius on the
						corners.
					</p>
					<p>Here is some more text to see how it wraps.</p>
				</Bubble.Content>
			</Bubble.Root>
		</div>
	</Example>

	<Example title="Variants">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Bubble.Root>
				<Bubble.Content>
					Default bubbles use the primary color for the active user side of a chat.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>
					Secondary bubbles are the standard neutral surface for assistant and
					conversation content.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="muted">
				<Bubble.Content>
					Muted bubbles lower the emphasis for quiet system notes or for displaying
					supporting content.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="tinted" align="end">
				<Bubble.Content>
					Tinted bubbles use a softer primary tint when primary fill is too strong.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="outline">
				<Bubble.Content>
					Outline bubbles can be used to frame message content and give it a border.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="destructive">
				<Bubble.Content>
					Destructive bubbles flag errors or failed actions in a conversation.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="ghost">
				<Bubble.Content>
					<span class="whitespace-pre-wrap">
						{`Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Ghost bubbles are full width and can take the full width of the container.
`}
					</span>
				</Bubble.Content>
			</Bubble.Root>
		</div>
	</Example>

	<Example title="Alignment">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Bubble.Root variant="muted">
				<Bubble.Content>This bubble is aligned to the start.</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root align="end">
				<Bubble.Content>This bubble is aligned to the end.</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="muted">
				<Bubble.Content>
					This multiline bubble is aligned to the start. The corners should adjust when
					the text wraps to show the grouped side of the conversation.
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root align="end">
				<Bubble.Content>
					This multiline bubble is aligned to the end. It should sit on the opposite side
					with the matching corner radius for wrapped text.
				</Bubble.Content>
			</Bubble.Root>
		</div>
	</Example>

	<Example title="Grouped">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Bubble.Group>
				<Bubble.Root variant="secondary">
					<Bubble.Content>I finished the audit pass.</Bubble.Content>
				</Bubble.Root>
				<Bubble.Root variant="secondary">
					<Bubble.Content>
						The registry output looks clean, but I found one stale route.
					</Bubble.Content>
				</Bubble.Root>
				<Bubble.Root variant="secondary">
					<Bubble.Content>Want me to remove it now?</Bubble.Content>
				</Bubble.Root>
			</Bubble.Group>
			<Bubble.Group>
				<Bubble.Root variant="tinted" align="end">
					<Bubble.Content>Yes, clean that up.</Bubble.Content>
				</Bubble.Root>
				<Bubble.Root variant="tinted" align="end">
					<Bubble.Content>Then rerun the registry build.</Bubble.Content>
				</Bubble.Root>
			</Bubble.Group>
		</div>
	</Example>

	<Example title="Collapsible">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Collapsible.Root bind:open>
				<Bubble.Root variant="muted" align="end">
					<Bubble.Content class="whitespace-pre-line">
						<div>{open || !isLong ? text : preview}</div>
						{#if isLong}
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Button.Root
										{...props}
										variant="link"
										class="text-muted-foreground gap-1 p-0"
									>
										{open ? "Show less" : "Show more"}
										<IconPlaceholder
											lucide="ChevronDownIcon"
											tabler="IconChevronDown"
											hugeicons="ArrowDown01Icon"
											phosphor="CaretDownIcon"
											remixicon="RiArrowDownSLine"
											data-icon="inline-end"
											class="group-data-panel-open/button:rotate-180"
										/>
									</Button.Root>
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

	<Example title="Button & Links">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Bubble.Root>
				<Bubble.Content>
					{#snippet child({ props })}
						<a href="#button-links" {...props}>This bubble is a link.</a>
					{/snippet}
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>
					{#snippet child({ props })}
						<button type="button" {...props}>This one is a button you can click.</button
						>
					{/snippet}
				</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="muted">
				<Bubble.Content>
					{#snippet child({ props })}
						<button type="button" {...props}>
							You can also do tinted buttons. Even ones that are multilines.
						</button>
					{/snippet}
				</Bubble.Content>
			</Bubble.Root>
			<Marker.Root variant="separator">
				<Marker.Content>Chat Suggestions</Marker.Content>
			</Marker.Root>
			<Bubble.Root>
				<Bubble.Content>How can I help you today?</Bubble.Content>
			</Bubble.Root>
			<Bubble.Group>
				{#each quickReplies as reply (reply.label)}
					<Bubble.Root variant="outline" align="end">
						<Bubble.Content class="border-primary border-dashed">
							{#snippet child({ props })}
								<button
									type="button"
									onclick={() => toast(reply.message)}
									{...props}
								>
									{reply.label}
								</button>
							{/snippet}
						</Bubble.Content>
					</Bubble.Root>
				{/each}
			</Bubble.Group>
		</div>
	</Example>

	<Example title="Reaction Placement">
		<div class="flex w-full max-w-md flex-col gap-12">
			<Marker.Root variant="separator">
				<Marker.Content>side=bottom align=end</Marker.Content>
			</Marker.Root>
			<Bubble.Root>
				<Bubble.Content>This is a one line message.</Bubble.Content>
				<Bubble.Reactions
					side="bottom"
					align="end"
					role="img"
					aria-label="Reaction: thumbs up"
				>
					<span>👍</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root variant="secondary" align="end">
				<Bubble.Content>
					A longer message that wraps across lines so the reaction offset is easier to
					inspect.
				</Bubble.Content>
				<Bubble.Reactions
					side="bottom"
					align="start"
					role="img"
					aria-label="Reactions: thumbs up, surprised"
				>
					<span>👍</span>
					<span>😮</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root variant="tinted">
				<Bubble.Content>
					A longer message that wraps across lines so the reaction offset is easier to
					inspect.
				</Bubble.Content>
				<Bubble.Reactions
					side="bottom"
					align="end"
					role="img"
					aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more"
				>
					<span>👍</span>
					<span>😮</span>
					<span>🔥</span>
					<span>👀</span>
					<span>+8</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Marker.Root variant="separator">
				<Marker.Content>side=bottom align=start</Marker.Content>
			</Marker.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>This is a one line message.</Bubble.Content>
				<Bubble.Reactions
					side="bottom"
					align="start"
					role="img"
					aria-label="Reaction: fire"
				>
					<span>🔥</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>
					A longer message that wraps across lines so the reaction offset is easier to
					inspect.
				</Bubble.Content>
				<Bubble.Reactions
					side="bottom"
					align="start"
					role="img"
					aria-label="Reactions: thumbs up, surprised, fire, eyes"
				>
					<span>👍</span>
					<span>😮</span>
					<span>🔥</span>
					<span>👀</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Marker.Root variant="separator">
				<Marker.Content>side=top align=start</Marker.Content>
			</Marker.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>This is a one line message.</Bubble.Content>
				<Bubble.Reactions side="top" align="start" role="img" aria-label="Reaction: fire">
					<span>🔥</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>
					A longer message that wraps across lines so the reaction offset is easier to
					inspect.
				</Bubble.Content>
				<Bubble.Reactions
					side="top"
					align="start"
					role="img"
					aria-label="Reactions: thumbs up, surprised, fire, eyes"
				>
					<span>👍</span>
					<span>😮</span>
					<span>🔥</span>
					<span>👀</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Marker.Root variant="separator">
				<Marker.Content>side=bottom align=end</Marker.Content>
			</Marker.Root>
			<Bubble.Root variant="muted">
				<Bubble.Content>This is a one line message.</Bubble.Content>
				<Bubble.Reactions
					side="top"
					align="end"
					role="img"
					aria-label="Reaction: thumbs up"
				>
					<span>👍</span>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root variant="muted">
				<Bubble.Content>
					A longer message that wraps across lines so the reaction offset.
				</Bubble.Content>
				<Bubble.Reactions
					side="top"
					align="end"
					role="img"
					aria-label="Reactions: thumbs up, surprised, fire, eyes"
					class="px-1.5 py-0.5"
				>
					<span>👍</span>
					<span>😮</span>
					<span>🔥</span>
					<span>👀</span>
				</Bubble.Reactions>
			</Bubble.Root>
		</div>
	</Example>

	<Example title="Reactions Buttons">
		<div class="flex w-full max-w-md flex-col gap-8">
			<Bubble.Root>
				<Bubble.Content>This is a one line message.</Bubble.Content>
				<Bubble.Reactions>
					<Button.Root
						variant="outline"
						size="xs"
						onclick={() => toast("You clicked the button in the bubble reaction")}
					>
						Button
					</Button.Root>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root align="end">
				<Bubble.Content>This is a one line message.</Bubble.Content>
				<Bubble.Reactions align="start">
					<Button.Root variant="ghost" size="icon-xs" onclick={() => toast("Confetti!")}>
						🎉
					</Button.Root>
				</Bubble.Reactions>
			</Bubble.Root>
			<Bubble.Root variant="tinted">
				<Bubble.Content>
					We are going to the movies first then dinner. Are you in?
				</Bubble.Content>
				<Bubble.Reactions class="bg-background gap-1">
					<Button.Root
						variant="secondary"
						size="icon-xs"
						aria-label="Thumbs up"
						onclick={() => toast("You agree!")}
					>
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUpIcon"
							phosphor="ArrowUpIcon"
							remixicon="RiArrowUpLine"
						/>
					</Button.Root>
					<Button.Root
						variant="secondary"
						size="icon-xs"
						aria-label="Thumbs down"
						onclick={() => toast("You disagree!")}
					>
						<IconPlaceholder
							lucide="ArrowDownIcon"
							tabler="IconArrowDown"
							hugeicons="ArrowDownIcon"
							phosphor="ArrowDownIcon"
							remixicon="RiArrowDownLine"
						/>
					</Button.Root>
				</Bubble.Reactions>
			</Bubble.Root>
		</div>
	</Example>
</ExampleWrapper>
