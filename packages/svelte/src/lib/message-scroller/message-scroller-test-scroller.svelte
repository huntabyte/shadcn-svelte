<script lang="ts">
	import { MessageScroller } from "./index.js";
	import ApiProbe from "./message-scroller-test-api-probe.svelte";
	import RestoreMessageTarget from "./message-scroller-test-restore.svelte";
	import StateProbe from "./message-scroller-test-state-probe.svelte";
	import VisibilityProbe from "./message-scroller-test-visibility-probe.svelte";
	import type { TestScrollerOptions, TestScrollerRefs } from "./message-scroller-test-types.js";

	let {
		apiRef,
		autoScroll,
		contentAriaBusy,
		contentAriaRelevant,
		contentPaddingEnd = 0,
		contentPaddingStart = 0,
		contentRole,
		defaultScrollPosition,
		messages,
		observeVisibility,
		preserveScrollOnPrepend,
		restoreMessageId,
		restoreMessageOptions,
		scrollMargin,
		stateRef,
		stateRenderCountRef,
		visibilityRef,
	}: TestScrollerOptions & TestScrollerRefs = $props();
</script>

<MessageScroller.Provider {autoScroll} {defaultScrollPosition} {scrollMargin}>
	<MessageScroller.Root data-testid="scroller">
		{#if restoreMessageId}
			<RestoreMessageTarget messageId={restoreMessageId} options={restoreMessageOptions} />
		{/if}
		<MessageScroller.Viewport data-testid="viewport" {preserveScrollOnPrepend}>
			<MessageScroller.Content
				aria-busy={contentAriaBusy}
				aria-relevant={contentAriaRelevant}
				data-padding-end={contentPaddingEnd}
				data-padding-start={contentPaddingStart}
				data-testid="content"
				role={contentRole}
			>
				{#each messages as message (message.key ?? message.id)}
					<MessageScroller.Item
						data-testid="message"
						data-test-height={message.height ?? 40}
						messageId={message.registerMessage === false ? undefined : message.id}
						scrollAnchor={message.scrollAnchor}
					>
						{message.id}
					</MessageScroller.Item>
				{/each}
			</MessageScroller.Content>
		</MessageScroller.Viewport>
		<MessageScroller.Button data-testid="button">Scroll</MessageScroller.Button>
		<ApiProbe {apiRef} />
		<StateProbe {stateRef} {stateRenderCountRef} />
		{#if observeVisibility}
			<VisibilityProbe {visibilityRef} />
		{/if}
	</MessageScroller.Root>
</MessageScroller.Provider>
