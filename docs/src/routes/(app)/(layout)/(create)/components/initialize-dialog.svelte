<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";
	import PMExecute from "$lib/components/pm-execute.svelte";

	const designSystem = useDesignSystem();
</script>

<Dialog.Root>
	<Dialog.Trigger
		class={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden md:flex")}
	>
		<SquareTerminal />
		Initialize Project
	</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-lg!">
		<Dialog.Header>
			<Dialog.Title>Initialize Project</Dialog.Title>
			<Dialog.Description>
				Run the following command to initialize your project with the current design system.
			</Dialog.Description>
		</Dialog.Header>
		<Tooltip.Provider>
			<PMExecute command="shadcn-svelte init '{designSystem.shareUrl}'" />
		</Tooltip.Provider>
	</Dialog.Content>
</Dialog.Root>
