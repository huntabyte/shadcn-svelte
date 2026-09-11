<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import { createChat } from "$lib/ai.js";
	import { createScriptedChat } from "$lib/ai.svelte.js";
	import { MESSAGE_ANIMATIONS, type MessageAnimationId } from "$lib/message-animations.js";
	import MessageAnimated from "$lib/components/message-animated.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const chat = createChat()
		.user("Can user messages pop in like iMessage without breaking anchoring?")
		.sleep(1000)
		.assistant(
			"Yes. Animate the user row with transform and opacity, and let the assistant response stream normally below it.\n\nThat keeps the row measurement predictable while still giving the newly sent bubble a more tactile entrance."
		)
		.user("What makes the animation feel more like iMessage?")
		.sleep(1000)
		.assistant(
			"Use a quick spring from the trailing edge: a little scale, a small upward move, and no layout animation.\n\nThe bubble feels tactile, but the measured row stays predictable, so anchoring and auto-scroll do not have to fight a changing layout."
		)
		.user("Can I switch between presets while testing the same thread?")
		.sleep(1000)
		.assistant(
			"Yes. Keep the conversation in place while you change the preset, then send the next message to compare the new entrance against the same context.\n\nThat makes it easier to judge the difference between a subtle fade, a snappy pop, and a more dramatic 3D tilt without rebuilding the scenario each time."
		);

	const initialMessages = chat.get(0);
	const transport = chat.transport({ delayMs: 15 });
	const demo = createScriptedChat({ chat, transport, initialMessages });
	const nextMessage = $derived(chat.next(demo.messages));
	const isBusy = $derived(demo.status === "submitted" || demo.status === "streaming");

	let presetId = $state<MessageAnimationId>("fade");
	const preset = $derived(MESSAGE_ANIMATIONS[presetId]);
</script>

<div class="relative flex flex-col gap-4">
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
		<Card.Header class="border-b">
			<Card.Title>Animation</Card.Title>
			<Card.Description>
				Choose how user messages are animated when they are added to the conversation.
			</Card.Description>
			<Card.Action class="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					size="icon"
					aria-label="Reset animated messages"
					disabled={demo.messages.length === 0 || isBusy}
					onclick={() => demo.setMessages(initialMessages)}
				>
					<RotateCwIcon />
				</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
			{#if demo.messages.length === 0}
				<Empty.Root class="h-full">
					<Empty.Header>
						<Empty.Media variant="icon">
							<MessageCircleDashedIcon />
						</Empty.Media>
						<Empty.Title>No Messages Yet</Empty.Title>
						<Empty.Description>Click the button below to send the first message.</Empty.Description>
					</Empty.Header>
				</Empty.Root>
			{:else}
				<MessageScroller.Provider>
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content aria-busy={isBusy} class="p-(--card-spacing)">
								{#each demo.messages as message (message.id)}
									<MessageAnimated
										{message}
										animationPreset={preset}
										userVariant="muted"
										assistantVariant="ghost"
									/>
								{/each}
							</MessageScroller.Content>
						</MessageScroller.Viewport>
						<MessageScroller.Button />
					</MessageScroller.Root>
				</MessageScroller.Provider>
			{/if}
		</Card.Content>
		<Card.Footer class="border-t">
			<Select.Root type="single" bind:value={presetId}>
				<Select.Trigger aria-label="Animation preset">{preset.name}</Select.Trigger>
				<Select.Content align="start" side="top">
					<Select.Group>
						{#each Object.values(MESSAGE_ANIMATIONS) as animation (animation.id)}
							<Select.Item value={animation.id} label={animation.name}>{animation.name}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Button
				type="button"
				size="icon"
				class="ml-auto"
				disabled={!nextMessage || isBusy}
				onclick={() => {
					if (!nextMessage || isBusy) {
						return;
					}

					void demo.sendMessage(nextMessage);
				}}
			>
				<ArrowUpIcon />
				<span class="sr-only">Send Message</span>
			</Button>
		</Card.Footer>
	</Card.Root>
	<div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
		Select an animation then click send to see it in action.
	</div>
</div>
