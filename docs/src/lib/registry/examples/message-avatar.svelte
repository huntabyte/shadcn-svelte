<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<Message.Root>
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Fallback>RB</Avatar.Fallback>
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
				<Avatar.Fallback>ME</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>Can you share the exact error?</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
</div>
