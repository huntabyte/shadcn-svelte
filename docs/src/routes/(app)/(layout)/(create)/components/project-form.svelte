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
	<Dialog.Trigger class={cn(buttonVariants({ variant: "default" }))}>
		Create Project
	</Dialog.Trigger>
	<Dialog.Content
		class="dark no-scrollbar max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl p-6 shadow-xl **:data-[slot=field-separator]:h-2 sm:max-w-sm"
	>
		<Dialog.Header>
			<Dialog.Title>Create Project</Dialog.Title>
			<Dialog.Description>
				Run the following command to create your project with the current preset.
			</Dialog.Description>
		</Dialog.Header>
		<Tooltip.Provider>
			<PMExecute
				class={cn("dark")}
				command="shadcn-svelte init --preset {designSystem.preset}"
			/>
		</Tooltip.Provider>
	</Dialog.Content>
</Dialog.Root>
