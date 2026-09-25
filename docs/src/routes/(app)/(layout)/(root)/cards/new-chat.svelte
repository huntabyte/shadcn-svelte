<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const prompt =
		"I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.";
</script>

<div class="relative flex flex-col gap-4">
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
		<Card.Header class="gap-1 border-b">
			<Card.Title>New Chat</Card.Title>
			<Card.Description>How can I help you today?</Card.Description>
			<Card.Action>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon" aria-label="Reset conversation">
								<RotateCwIcon />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Reset</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Card.Action>
		</Card.Header>
		<Card.Content class="flex-1 overflow-hidden p-0">
			<Empty.Root class="h-full">
				<Empty.Header>
					<Empty.Media variant="icon">
						<MessageCircleDashedIcon />
					</Empty.Media>
					<Empty.Title>Morning, shadcn!</Empty.Title>
					<Empty.Description>
						What are we working on today? Press send to start a new conversation
					</Empty.Description>
				</Empty.Header>
			</Empty.Root>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<form onsubmit={(event) => event.preventDefault()} class="w-full">
				<InputGroup.Root>
					<div class="h-14 w-full px-3 py-2.5">
						<span class="line-clamp-2">{prompt}</span>
					</div>
					<InputGroup.Addon align="block-end" class="pt-1">
						<InputGroup.Button
							aria-label="Add files"
							type="button"
							size="icon-sm"
							variant="outline"
						>
							<PlusIcon />
						</InputGroup.Button>
						<InputGroup.Button type="submit" variant="default" size="icon-sm" class="ml-auto">
							<ArrowUpIcon />
							<span class="sr-only">Send</span>
						</InputGroup.Button>
					</InputGroup.Addon>
				</InputGroup.Root>
			</form>
		</Card.Footer>
	</Card.Root>
</div>
