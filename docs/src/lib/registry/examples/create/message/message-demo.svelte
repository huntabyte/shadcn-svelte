<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<Example title="Message">
	<div class="flex w-full max-w-md min-w-0 flex-col gap-10">
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root>
					<Bubble.Content>Deploying to prod real quick.</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>It's 4:55 PM. On a Friday.</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root>
					<Bubble.Content>It's a one-line change.</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Content>
				<Bubble.Group>
					<Bubble.Root variant="muted">
						<Bubble.Content>
							It's always a one-line change 😭. Make sure to run the tests this time.
						</Bubble.Content>
					</Bubble.Root>
					<Bubble.Root variant="muted">
						<Bubble.Content>Alright, go for it.</Bubble.Content>
					</Bubble.Root>
				</Bubble.Group>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
