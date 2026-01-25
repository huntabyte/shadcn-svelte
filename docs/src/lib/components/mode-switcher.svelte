<script lang="ts">
	import Button from "$lib/registry/ui/button/button.svelte";
	import { toggleMode } from "mode-watcher";
	import Kbd from "$lib/registry/ui/kbd/kbd.svelte";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<Button
			variant="ghost"
			size="icon"
			class="group/toggle extend-touch-target size-8"
			onclick={toggleMode}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4.5"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
				<path d="M12 3l0 18" />
				<path d="M12 9l4.65 -4.65" />
				<path d="M12 14.3l7.37 -7.37" />
				<path d="M12 19.6l8.85 -8.85" />
			</svg>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content class="flex items-center gap-2 pr-1">
		Toggle Mode <Kbd>D</Kbd>
	</Tooltip.Content>
</Tooltip.Root>
