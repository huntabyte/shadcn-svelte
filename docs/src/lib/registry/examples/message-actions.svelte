<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import RefreshCcwIcon from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsDownIcon from "@lucide/svelte/icons/thumbs-down";
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message.Root>
		<Message.Content>
			<Bubble.Root variant="muted">
				<Bubble.Content
					>The install failure is coming from the workspace package.</Bubble.Content
				>
			</Bubble.Root>
			<Message.Footer>
				<Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
					<CopyIcon />
				</Button>
				<Button variant="ghost" size="icon" aria-label="Like" title="Like">
					<ThumbsUpIcon />
				</Button>
				<Button variant="ghost" size="icon" aria-label="Dislike" title="Dislike">
					<ThumbsDownIcon />
				</Button>
			</Message.Footer>
		</Message.Content>
	</Message.Root>
	<Message.Root align="end">
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>Okay, drop me a link. Taking a look...</Bubble.Content>
			</Bubble.Root>
			<Message.Footer class="gap-2">
				<span class="text-destructive font-normal">Failed to send</span>
				<Button variant="ghost" size="icon-xs" title="Retry" aria-label="Retry">
					<RefreshCcwIcon />
				</Button>
			</Message.Footer>
		</Message.Content>
	</Message.Root>
</div>
