<script lang="ts">
	import BrainIcon from "@lucide/svelte/icons/brain";
	import { MediaQuery } from "svelte/reactivity";
	import { MESSAGE_ANIMATIONS, type MessageAnimationPreset } from "$lib/message-animations.js";
	import type { DemoMessage } from "$lib/ai.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import type { BubbleVariant } from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	type AnimatedMessage = DemoMessage | {
		id: string;
		role: string;
		text?: string;
		parts?: DemoMessage["parts"];
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

	const reduceMotion = new MediaQuery("(prefers-reduced-motion: reduce)");
	const isUserMessage = $derived(message.role === "user");
	const parts = $derived(getMessageAnimatedContentParts(message));
	const itemClass = $derived(
		[isUserMessage && !reduceMotion.current ? animationPreset.class : "", className]
			.filter(Boolean)
			.join(" ")
	);

	function getMessageAnimatedContentParts(current: AnimatedMessage) {
		if (current.parts) {
			return current.parts.flatMap((part, index) => {
				const type =
					part.type === "reasoning" || part.type === "thinking"
						? "reasoning"
						: part.type === "text"
							? "text"
							: null;
				const text = typeof part.text === "string" ? part.text : null;

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

<MessageScroller.Item
	class={itemClass}
	messageId={message.id}
	scrollAnchor={scrollAnchor ?? isUserMessage}
	{...restProps}
>
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
</MessageScroller.Item>
