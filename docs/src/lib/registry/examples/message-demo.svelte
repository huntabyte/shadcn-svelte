<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<Message.Root align="end">
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/10.png" alt="@me" />
				<Avatar.Fallback>ME</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>Deploying to prod real quick.</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root>
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/02.png" alt="@rabbit" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Root variant="muted">
				<Bubble.Content>It's 4:55 PM. On a Friday.</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root align="end">
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/10.png" alt="@me" />
				<Avatar.Fallback>ME</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>It's a one-line change.</Bubble.Content>
			</Bubble.Root>
			<Message.Footer>Delivered</Message.Footer>
		</Message.Content>
	</Message.Root>
	<Message.Root>
		<Message.Avatar>
			<Avatar.Root>
				<Avatar.Image src="/avatars/02.png" alt="@rabbit" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</Message.Avatar>
		<Message.Content>
			<Bubble.Group>
				<Bubble.Root variant="muted">
					<Bubble.Content>It's always a one-line change &#128557;.</Bubble.Content>
				</Bubble.Root>
				<Bubble.Root variant="muted">
					<Bubble.Content>Alright, let me take a look.</Bubble.Content>
					<Bubble.Reactions aria-label="Reactions: thumbs up">
						<span>&#128077;</span>
					</Bubble.Reactions>
				</Bubble.Root>
			</Bubble.Group>
		</Message.Content>
	</Message.Root>
	<Marker.Root role="status">
		<Marker.Content class="shimmer">
			<span class="font-medium">Oliver</span> is typing...
		</Marker.Content>
	</Marker.Root>
</div>
