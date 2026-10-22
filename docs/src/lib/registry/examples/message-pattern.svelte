<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import RefreshCcwIcon from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsDownIcon from "@lucide/svelte/icons/thumbs-down";
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
	import { onDestroy, type Snippet } from "svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import Markdown from "$lib/components/markdown/markdown.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";

	const reply = `Install Dialog, then open it from the gear button in \`site-header.tsx\`.

\`\`\`bash
npx shadcn@latest add dialog
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`DialogContent\`. Focus moves into the dialog when it opens, and **Esc** closes it.`;

	let copied = $state(false);
	let feedback = $state<"like" | "dislike" | null>(null);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function copy() {
		void navigator.clipboard.writeText(reply);
		copied = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => (copied = false), 2000);
	}

	onDestroy(() => clearTimeout(timeout));
</script>

{#snippet messageAction(label: string, icon: Snippet, onclick?: () => void, pressed?: boolean)}
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					size="icon-sm"
					aria-label={label}
					aria-pressed={pressed}
					{onclick}
				>
					{@render icon()}
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{label}</p>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

{#snippet copyIcon()}
	<CopyIcon />
{/snippet}

{#snippet copyStateIcon()}
	{#if copied}
		<CheckIcon />
	{:else}
		<CopyIcon />
	{/if}
{/snippet}

{#snippet editIcon()}
	<PencilIcon />
{/snippet}

{#snippet likeIcon()}
	<ThumbsUpIcon class={feedback === "like" ? "fill-current" : undefined} />
{/snippet}

{#snippet dislikeIcon()}
	<ThumbsDownIcon class={feedback === "dislike" ? "fill-current" : undefined} />
{/snippet}

{#snippet retryIcon()}
	<RefreshCcwIcon />
{/snippet}

<div class="mx-auto flex w-full max-w-md flex-col gap-8 py-6 text-sm">
	<Message.Root align="end">
		<Message.Content class="gap-2">
			<Bubble.Root align="end" variant="muted">
				<Bubble.Content>
					How do I add a settings dialog? It should open from the gear icon in the header.
				</Bubble.Content>
			</Bubble.Root>
			<Message.Footer>
				{@render messageAction("Copy", copyIcon)}
				{@render messageAction("Edit", editIcon)}
			</Message.Footer>
		</Message.Content>
	</Message.Root>
	<Message.Root>
		<Message.Content class="gap-2">
			<Markdown content={reply} />
			<Message.Footer class="px-0">
				{@render messageAction(copied ? "Copied" : "Copy", copyStateIcon, copy)}
				{@render messageAction(
					"Good response",
					likeIcon,
					() => (feedback = feedback === "like" ? null : "like"),
					feedback === "like"
				)}
				{@render messageAction(
					"Bad response",
					dislikeIcon,
					() => (feedback = feedback === "dislike" ? null : "dislike"),
					feedback === "dislike"
				)}
				{@render messageAction("Retry", retryIcon)}
			</Message.Footer>
		</Message.Content>
	</Message.Root>
</div>
