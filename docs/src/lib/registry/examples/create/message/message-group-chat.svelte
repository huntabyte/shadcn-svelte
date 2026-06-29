<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";

	const logSummary = `I found the following error in the logs:

- Error: No users found
- Stack trace:
  - at src/users/services/user-service.ts:123
  - at src/users/services/get-user.ts:230

Can you check if the users are being created?`;
</script>

<Example title="Group Chat">
	<div class="flex w-full max-w-md flex-col gap-10">
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root variant="tinted">
					<Bubble.Content>Why is the dashboard showing zero users</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Group>
			<Message.Root>
				<Message.Avatar />
				<Message.Content>
					<Bubble.Root variant="muted">
						<Bubble.Content>Define "zero."</Bubble.Content>
					</Bubble.Root>
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
						<Bubble.Content>What do you mean?</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		</Message.Group>
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root variant="tinted">
					<Bubble.Content
						><span class="font-medium">@eve</span> can you check?</Bubble.Content
					>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Marker.Root role="status">
				<Marker.Icon>
					<Spinner />
				</Marker.Icon>
				<Marker.Content>Checking the logs...</Marker.Content>
			</Marker.Root>
		</Message.Root>
		<Message.Root>
			<Message.Content>
				<Message.Header>Eve</Message.Header>
				<Bubble.Root variant="ghost">
					<Bubble.Content>
						<span class="whitespace-pre-wrap">{logSummary}</span>
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
