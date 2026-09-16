<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const quickReplies = [
		{
			label: "I need help with my account.",
			message: "I need help with my account.",
		},
		{
			label: "I forgot my password.",
			message: "I forgot my password.",
		},
		{
			label: "I have another question. I'd like to talk to a human. Can you help me?",
			message: "I have another question.",
		},
	];
</script>

<Example title="Button & Links">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Bubble.Root>
			<Bubble.Content>
				{#snippet child({ props })}
					<a href="#/" {...props}>This bubble is a link.</a>
				{/snippet}
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="secondary">
			<Bubble.Content>
				{#snippet child({ props })}
					<button type="button" {...props}>This one is a button you can click.</button>
				{/snippet}
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content>
				{#snippet child({ props })}
					<button type="button" {...props}>
						You can also do tinted buttons. Even ones that are multilines.
					</button>
				{/snippet}
			</Bubble.Content>
		</Bubble.Root>
		<Marker.Root variant="separator">
			<Marker.Content>Chat Suggestions</Marker.Content>
		</Marker.Root>
		<Bubble.Root>
			<Bubble.Content>How can I help you today?</Bubble.Content>
		</Bubble.Root>
		<Bubble.Group>
			{#each quickReplies as reply (reply.label)}
				<Bubble.Root variant="outline" align="end">
					<Bubble.Content class="border-dashed border-primary">
						{#snippet child({ props })}
							<button type="button" {...props} onclick={() => toast(reply.message)}>
								{reply.label}
							</button>
						{/snippet}
					</Bubble.Content>
				</Bubble.Root>
			{/each}
		</Bubble.Group>
	</div>
</Example>
