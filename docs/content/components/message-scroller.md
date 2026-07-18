---
title: Message Scroller
description: Build accessible, auto-following message timelines with scroll controls.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add message-scroller
```

## Usage

```svelte
<script lang="ts">
  import * as MessageScroller from "$lib/components/ui/message-scroller";
</script>

<MessageScroller.Provider autoScroll defaultScrollPosition="end">
  <MessageScroller.Root class="h-96">
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        {#each messages as message (message.id)}
          <MessageScroller.Item messageId={message.id} scrollAnchor={message.isUnread}>
            {message.text}
          </MessageScroller.Item>
        {/each}
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button direction="end">Jump to latest</MessageScroller.Button>
  </MessageScroller.Root>
</MessageScroller.Provider>
```

The provider exposes `useMessageScroller`, `useMessageScrollerScrollable`, and `useMessageScrollerVisibility` for advanced controls and state.
