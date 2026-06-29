<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<Example title="Markdown">
	<div class="flex w-full max-w-sm flex-col gap-8 py-12">
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root>
					<Bubble.Content>How do I render markdown in a message?</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Content>
				<Bubble.Root variant="ghost">
					<Bubble.Content>
						<div class="space-y-4">
							<p>Here's how to render markdown in a message:</p>
							<ol class="list-decimal space-y-1 ps-5">
								<li>Render assistant text through <strong>Markdown</strong>.</li>
								<li>Keep user messages as plain text.</li>
								<li>
									Use a <code>ghost</code> bubble so the response is unframed.
								</li>
							</ol>
						</div>
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
