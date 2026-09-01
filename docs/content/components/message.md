---
title: Message
description: Compose structured chat and conversation messages.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add message
```

## Usage

```svelte
<script lang="ts">
  import * as Message from "$lib/components/ui/message";
</script>

<Message.Group>
  <Message.Root align="start">
    <Message.Avatar>AI</Message.Avatar>
    <Message.Content>
      <Message.Header>Assistant</Message.Header>
      <p>How can I help?</p>
      <Message.Footer>Just now</Message.Footer>
    </Message.Content>
  </Message.Root>
</Message.Group>
```

Use `align="end"` for messages authored by the current user.
