<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: "secondary" })}>Share</Popover.Trigger>
	<Popover.Content class="w-[520px]" align="end">
		<div class="flex flex-col space-y-2 text-center sm:text-start">
			<h3 class="text-lg font-semibold">Share preset</h3>
			<p class="text-muted-foreground text-sm">
				Anyone who has this link and an OpenAI account will be able to view this.
			</p>
		</div>
		<div class="relative flex-1">
			<Label for="link" class="sr-only">Link</Label>
			<Input
				id="link"
				defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
				class="h-9 pr-10"
			/>
			<Button type="submit" size="icon" variant="ghost" class="absolute top-1 right-1 size-7">
				<span class="sr-only">Copy</span>
				<CopyIcon class="size-3.5" />
			</Button>
		</div>
	</Popover.Content>
</Popover.Root>
