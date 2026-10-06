<script lang="ts">
	import BrainIcon from "@lucide/svelte/icons/brain";
	import { prefersReducedMotion } from "svelte/motion";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import type { DemoMessage } from "$lib/ai.js";
	import { MESSAGE_ANIMATIONS, type MessageAnimationPreset } from "$lib/message-animations.js";
	import type { BubbleVariant } from "$lib/registry/ui/bubble/index.js";

	type AnimatedMessagePart = {
		type: string;
		text?: string;
	};

	type AnimatedMessage =
		| DemoMessage
		| {
				id: string;
				role: string;
				text?: string;
				parts?: AnimatedMessagePart[];
		  };

	let {
		message,
		animationPreset = MESSAGE_ANIMATIONS["slide-up"],
		assistantVariant = "ghost",
		scrollAnchor,
		userVariant = "muted",
		class: className,
		...restProps
	}: {
		message: AnimatedMessage;
		animationPreset?: MessageAnimationPreset;
		assistantVariant?: BubbleVariant;
		scrollAnchor?: boolean;
		userVariant?: BubbleVariant;
		class?: string;
	} = $props();

	const isUserMessage = $derived(message.role === "user");
	const parts = $derived(getMessageAnimatedContentParts(message));

	function enterMessage(node: HTMLElement, preset: MessageAnimationPreset) {
		if (prefersReducedMotion.current) return { duration: 0 };
		return preset.transition(node);
	}

	function getMessageAnimatedContentParts(current: AnimatedMessage) {
		if (current.parts) {
			return current.parts.flatMap((part, index) => {
				const type =
					part.type === "reasoning" || part.type === "thinking"
						? "reasoning"
						: part.type === "text"
							? "text"
							: null;
				const text = "text" in part && typeof part.text === "string" ? part.text : null;

				if (!type || text === null) {
					return [];
				}

				return [{ key: `${current.id}-${index}`, text, type }];
			});
		}

		return typeof current.text === "string"
			? [{ key: `${current.id}-text`, text: current.text, type: "text" as const }]
			: [];
	}
</script>

{#snippet row()}
	<Message.Root align={isUserMessage ? "end" : "start"}>
		<Message.Content>
			{#each parts as part (part.key)}
				{@const paragraphs = part.text
					.split(/\n\s*\n/)
					.map((paragraph) => paragraph.trim())
					.filter(Boolean)}
				{#if part.type === "reasoning"}
					<div class="w-full border-l-2 border-muted-foreground/30 pl-3 text-muted-foreground">
						<div class="mb-1 flex items-center gap-1.5 text-xs font-medium">
							<BrainIcon class="size-3.5" />
							Reasoning
						</div>
						<div class="space-y-1.5 text-sm">
							{#each paragraphs as paragraph, paragraphIndex (`${part.key}-${paragraphIndex}`)}
								<p class="whitespace-pre-wrap">{paragraph}</p>
							{/each}
						</div>
					</div>
				{:else}
					<Bubble.Root variant={isUserMessage ? userVariant : assistantVariant}>
						<Bubble.Content class="space-y-2">
							{#each paragraphs as paragraph, paragraphIndex (`${part.key}-${paragraphIndex}`)}
								<p class="whitespace-pre-wrap">{paragraph}</p>
							{/each}
						</Bubble.Content>
					</Bubble.Root>
				{/if}
			{/each}
		</Message.Content>
	</Message.Root>
{/snippet}

{#if isUserMessage}
	<MessageScroller.Item
		class={className}
		messageId={message.id}
		scrollAnchor={scrollAnchor ?? true}
		{...restProps}
	>
		{#snippet child({ props })}
			<div {...props} in:enterMessage|global={animationPreset}>
				{@render row()}
			</div>
		{/snippet}
	</MessageScroller.Item>
{:else}
	<MessageScroller.Item class={className} messageId={message.id} {scrollAnchor} {...restProps}>
		{@render row()}
	</MessageScroller.Item>
{/if}
