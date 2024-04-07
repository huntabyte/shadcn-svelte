<script lang="ts">
	import CornerDownLeft from "lucide-svelte/icons/corner-down-left";
	import Mic from "lucide-svelte/icons/mic";
	import Paperclip from "lucide-svelte/icons/paperclip";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import * as Tooltip from "$lib/registry/default/ui/tooltip/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import { Textarea } from "$lib/registry/default/ui/textarea/index.js";
</script>

<form
	class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
	data-x-chunk="dashboard-03-chunk-1"
>
	<Label for="message" class="sr-only">Message</Label>
	<Textarea
		id="message"
		placeholder="Type your message here..."
		class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
	/>
	<div class="flex items-center p-3 pt-0">
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="icon">
					<Paperclip class="size-4" />
					<span class="sr-only">Attach file</span>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="top">Attach File</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="icon">
					<Mic class="size-4" />
					<span class="sr-only">Use Microphone</span>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="top">Use Microphone</Tooltip.Content>
		</Tooltip.Root>
		<Button type="submit" size="sm" class="ml-auto gap-1.5">
			Send Message
			<CornerDownLeft class="size-3.5" />
		</Button>
	</div>
</form>
