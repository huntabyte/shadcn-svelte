<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
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
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="Copy01Icon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</Button>
					<Button variant="ghost" size="icon" aria-label="Retry" title="Retry">
						<IconPlaceholder
							lucide="RefreshCcwIcon"
							tabler="IconRefresh"
							hugeicons="ReloadIcon"
							phosphor="ArrowClockwiseIcon"
							remixicon="RiRefreshLine"
						/>
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
						The install failure is coming from the workspace package. I can open the exact log line
						or retry the deployment.
					</Bubble.Content>
				</Bubble.Root>
				<Message.Footer>
					<Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="Copy01Icon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</Button>
					<Button variant="ghost" size="icon" aria-label="Like: thumbs up" title="Like: thumbs up">
						<IconPlaceholder
							lucide="ThumbsUpIcon"
							tabler="IconThumbUp"
							hugeicons="ThumbsUpIcon"
							phosphor="ThumbsUpIcon"
							remixicon="RiThumbUpLine"
						/>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Like: thumbs down"
						title="Like: thumbs down"
					>
						<IconPlaceholder
							lucide="ThumbsDownIcon"
							tabler="IconThumbDown"
							hugeicons="ThumbsDownIcon"
							phosphor="ThumbsDownIcon"
							remixicon="RiThumbDownLine"
						/>
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
					<span class="font-normal text-destructive">Failed to send</span>
					<Button variant="secondary" size="xs">Retry</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
