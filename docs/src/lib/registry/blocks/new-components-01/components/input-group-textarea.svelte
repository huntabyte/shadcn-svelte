<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CornerDownLeftIcon from "@lucide/svelte/icons/corner-down-left";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
</script>

<div class="grid w-full max-w-md gap-4">
	<InputGroup.Root>
		<InputGroup.Addon align="block-start" class="border-b">
			<InputGroup.Text class="font-mono font-medium">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-file-code"
				>
					<path
						d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
					/>
					<polyline points="14,2 14,8 20,8" />
					<path d="m10 13-2 2 2 2" />
					<path d="m14 17 2-2-2-2" />
				</svg>
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
