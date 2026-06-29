<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<Example title="Header and Footer">
	<div class="flex w-full max-w-md flex-col gap-12">
		<Message.Root align="end">
			<Message.Content>
				<Message.Header class="justify-end">You</Message.Header>
				<Bubble.Root>
					<Bubble.Content>
						Can we keep this style quiet and send the update today?
					</Bubble.Content>
				</Bubble.Root>
				<Message.Footer class="gap-2">
					<span>Delivered</span>
					<Button variant="ghost" size="xs">Undo</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
		<Message.Root align="start">
			<Message.Content>
				<Message.Header>
					<span>Olivia</span>
					<span class="ml-auto font-normal">1m ago</span>
				</Message.Header>
				<Bubble.Root variant="muted">
					<Bubble.Content>
						I checked the logs. The retry finished and the missing invoices are included
						now.
					</Bubble.Content>
					<Bubble.Reactions>
						<Button variant="ghost" size="xs">Thanks</Button>
					</Bubble.Reactions>
				</Bubble.Root>
				<Message.Footer class="gap-2">
					<span>From Support queue</span>
					<Button variant="ghost" size="xs">Copy</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
		<Message.Root align="end">
			<Message.Content>
				<Message.Header>Marina</Message.Header>
				<Bubble.Root variant="outline">
					<Bubble.Content>
						I drafted the reply with the exact filter path and a link to the export
						history.
					</Bubble.Content>
				</Bubble.Root>
				<Message.Footer class="gap-2">
					<span>Draft ready</span>
					<Button variant="outline" size="xs">Review</Button>
					<Button size="xs">Send</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
		<Message.Root align="start">
			<Message.Content>
				<Message.Header>Assistant note</Message.Header>
				<Bubble.Root variant="ghost">
					<Bubble.Content>
						Ghost messages keep long-form assistant notes aligned with the surrounding
						text instead of adding a frame.
					</Bubble.Content>
				</Bubble.Root>
				<Message.Footer class="gap-2">
					<span>Internal only</span>
					<Button variant="ghost" size="xs">Pin</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
		<Message.Root align="end">
			<Message.Content>
				<Message.Header class="justify-end">Automation warning</Message.Header>
				<Bubble.Root variant="destructive">
					<Bubble.Content>
						The old export link expires in 10 minutes. Regenerate before sending this
						transcript externally.
					</Bubble.Content>
				</Bubble.Root>
				<Message.Footer class="gap-2">
					<span>Needs action</span>
					<Button variant="destructive" size="xs">Regenerate</Button>
				</Message.Footer>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
