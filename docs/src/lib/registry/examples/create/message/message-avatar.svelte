<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<Example title="Avatar">
	<div class="flex w-full max-w-md flex-col gap-10">
		<Message.Root>
			<Message.Avatar>
				<Avatar.Root>
					<Avatar.Image
						src="https://github.com/shadcn.png"
						alt="@shadcn"
						class="grayscale"
					/>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</Message.Avatar>
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>Something went wrong. Any idea?</Bubble.Content>
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
					<Bubble.Content>
						I checked the latest deployment and found the build failed during dependency
						installation.
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root align="end">
			<Message.Avatar>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
					<Avatar.Fallback>ER</Avatar.Fallback>
				</Avatar.Root>
			</Message.Avatar>
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>Something went wrong. Any idea?</Bubble.Content>
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
					<Bubble.Content class="space-y-2">
						<div>
							I checked the latest deployment and found the build failed during
							dependency installation.
						</div>
						<div>Can you share the exact error message from the logs?</div>
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Avatar>
				<Avatar.Root>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</Message.Avatar>
			<Message.Content>
				<Bubble.Root variant="destructive">
					<Bubble.Content>Something went wrong. Any idea?</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
