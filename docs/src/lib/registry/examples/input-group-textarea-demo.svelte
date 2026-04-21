<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import CornerDownLeftIcon from "@lucide/svelte/icons/corner-down-left";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
</script>

<div class="grid w-full max-w-md gap-4">
	<InputGroup.Root>
		<InputGroup.Addon align="block-start" class="border-b">
			<InputGroup.Text class="font-mono font-medium">
				<FileCodeIcon />
				script.js
			</InputGroup.Text>
			<InputGroup.Button class="ms-auto" size="icon-xs">
				<RefreshCwIcon />
			</InputGroup.Button>
			<InputGroup.Button variant="ghost" size="icon-xs">
				<CopyIcon />
			</InputGroup.Button>
		</InputGroup.Addon>
		<InputGroup.Textarea placeholder="console.log('Hello, world!');" class="min-h-[200px]" />
		<InputGroup.Addon align="block-end" class="border-t">
			<InputGroup.Text>Line 1, Column 1</InputGroup.Text>
			<InputGroup.Button size="sm" class="ms-auto" variant="default">
				Run <CornerDownLeftIcon />
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
