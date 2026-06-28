<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<Message.Root>
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/03.png" alt="@avatar" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Root variant="muted">
				<Bubble.Content>The build failed during dependency installation.</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root align="end">
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/10.png" alt="@avatar" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>Can you share the exact error?</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root>
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/03.png" alt="@avatar" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Group>
				<Bubble.Root variant="muted">
					<Bubble.Content>Here's the error from the logs</Bubble.Content>
				</Bubble.Root>
				<Bubble.Root variant="muted">
					<Bubble.Content>
						Something went wrong with the build. The libraries are not installed
						correctly. Try running the build again.
					</Bubble.Content>
				</Bubble.Root>
			</Bubble.Group>
		</Message.Content>
	</Message.Root>
</div>
