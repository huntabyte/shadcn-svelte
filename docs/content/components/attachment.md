---
title: Attachment
description: Display file and media attachments with status and actions.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add attachment
```

## Usage

```svelte
<script lang="ts">
  import * as Attachment from "$lib/components/ui/attachment";
  import FileIcon from "@lucide/svelte/icons/file";
  import XIcon from "@lucide/svelte/icons/x";
</script>

<Attachment.Root state="done">
  <Attachment.Media><FileIcon /></Attachment.Media>
  <Attachment.Content>
    <Attachment.Title>proposal.pdf</Attachment.Title>
    <Attachment.Description>1.2 MB</Attachment.Description>
  </Attachment.Content>
  <Attachment.Actions>
    <Attachment.Action aria-label="Remove attachment"><XIcon /></Attachment.Action>
  </Attachment.Actions>
</Attachment.Root>
```

Attachment states are `idle`, `uploading`, `processing`, `error`, and `done`.
