<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<Example title="Group">
	<div class="flex w-full max-w-md flex-col gap-10">
		<Message.Group>
			<Message.Root>
				<Message.Content>
					<Bubble.Root variant="muted">
						<Bubble.Content>I checked the registry addresses.</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
			<Message.Root>
				<Message.Content>
					<Bubble.Root variant="muted">
						<Bubble.Content>
							The component and example JSON now live under the UI registry.
						</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		</Message.Group>
		<Message.Group>
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root variant="muted">
						<Bubble.Content>I checked the registry addresses.</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root variant="muted">
						<Bubble.Content>
							The component and example JSON now live under the UI registry.
						</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		</Message.Group>
		<Message.Group>
			<Message.Root align="end">
				<Message.Avatar />
				<Message.Content>
					<Bubble.Root variant="muted">
						<Bubble.Content>I checked the registry addresses.</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
			<Message.Root align="end">
				<Message.Avatar>
					<Avatar.Root>
						<Avatar.Image src="https://avatar.vercel.sh/shadcn" alt="@shadcn" />
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
						<Avatar.Image src="https://avatar.vercel.sh/shadcn" alt="@shadcn" />
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
</Example>
