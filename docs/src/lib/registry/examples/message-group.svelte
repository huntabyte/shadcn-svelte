<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<Message.Group>
		<Message.Root>
			<Message.Avatar />
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>I checked the registry addresses.</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Avatar>
				<Avatar.Root>
					<Avatar.Image src="/avatars/02.png" alt="@avatar" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</Message.Avatar>
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>
						The component and example JSON now live under the UI registry.
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
	</Message.Group>
</div>
