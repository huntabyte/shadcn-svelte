<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import RefreshCcwIcon from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsDownIcon from "@lucide/svelte/icons/thumbs-down";
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
</script>

<Example title="Actions">
	<div class="flex w-full max-w-md flex-col gap-10">
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root>
					<Bubble.Content>What is the status of the deployment?</Bubble.Content>
				</Bubble.Root>
				<Message.Footer>
					<Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
						<CopyIcon />
					</Button>
					<Button variant="ghost" size="icon" aria-label="Retry" title="Retry">
						<RefreshCcwIcon />
					</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Avatar>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
					<Avatar.Fallback>ER</Avatar.Fallback>
				</Avatar.Root>
			</Message.Avatar>
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>
						The install failure is coming from the workspace package. I can open the
						exact log line or retry the deployment.
					</Bubble.Content>
				</Bubble.Root>
				<Message.Footer>
					<Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
						<CopyIcon />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Like: thumbs up"
						title="Like: thumbs up"
					>
						<ThumbsUpIcon />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Like: thumbs down"
						title="Like: thumbs down"
					>
						<ThumbsDownIcon />
					</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root>
					<Bubble.Content>Okay drop me a link. I'll check it out.</Bubble.Content>
				</Bubble.Root>
				<Message.Footer class="gap-2">
					<span class="text-destructive font-normal">Failed to send</span>
					<Button variant="secondary" size="xs">Retry</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
