<script lang="ts">
	import Paperclip from "@lucide/svelte/icons/paperclip";
	import Mic from "@lucide/svelte/icons/mic";
	import CornerDownLeft from "@lucide/svelte/icons/corner-down-left";

	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";

	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
</script>

<form
	class="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1"
	data-x-chunk-name="dashboard-03-chunk-1"
	data-x-chunk-description="A form for sending a message to an AI chatbot. The form has a textarea and buttons to upload files and record audio."
>
	<Label for="message" class="sr-only">Message</Label>
	<Textarea
		id="message"
		placeholder="Type your message here..."
		class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
	/>
	<div class="flex items-center p-3 pt-0">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button {...props} size="icon" variant="ghost">
							<Paperclip class="size-4" />
							<span class="sr-only">Attach file</span>
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content side="top">Attach File</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button {...props} size="icon" variant="ghost">
							<Mic class="size-4" />
							<span class="sr-only">Use Microphone</span>
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content side="top">Use Microphone</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
		<Button type="submit" size="sm" class="ml-auto gap-1.5">
			Send Message
			<CornerDownLeft class="size-3.5" />
		</Button>
	</div>
</form>
