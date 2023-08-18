<script lang="ts">
	import { Copy } from "radix-icons-svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import { Label } from "@/registry/new-york/ui/label";
	import * as Popover from "@/registry/new-york/ui/popover";
</script>

<Popover.Root positioning={{ placement: "bottom-end" }}>
	<Popover.Trigger asChild let:builder>
		<Button variant="secondary" builders={[builder]}>Share</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[520px]">
		<div class="flex flex-col space-y-2 text-center sm:text-left">
			<h3 class="text-lg font-semibold">Share preset</h3>
			<p class="text-sm text-muted-foreground">
				Anyone who has this link and an OpenAI account will be able to
				view this.
			</p>
		</div>
		<div class="flex items-center space-x-2 pt-4">
			<div class="grid flex-1 gap-2">
				<Label for="link" class="sr-only">Link</Label>
				<Input
					id="link"
					value="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
					readonly
					class="h-9"
				/>
			</div>
			<Button type="submit" size="sm" class="px-3">
				<span class="sr-only"> Copy </span>
				<Copy class="h-4 w-4" />
			</Button>
		</div>
	</Popover.Content>
</Popover.Root>
