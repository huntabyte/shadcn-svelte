<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message.Root>
		<Message.Content>
			<Message.Header>Olivia</Message.Header>
			<Bubble.Root variant="muted">
				<Bubble.Content>I already checked the logs.</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root align="end">
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>
					Send the report to the team. Ping @shadcn if you need help.
				</Bubble.Content>
			</Bubble.Root>
			<Message.Footer>
				<div>Read <span class="font-normal">Yesterday</span></div>
			</Message.Footer>
		</Message.Content>
	</Message.Root>
</div>
