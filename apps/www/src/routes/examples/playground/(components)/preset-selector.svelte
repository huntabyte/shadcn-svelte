<script lang="ts">
	import { cn } from "@/utils";
	import * as Select from "@/registry/new-york/ui/select";
	import type { Preset } from "../(data)/presets";
	import { buttonVariants } from "@/registry/default/ui/button";

	export let presets: Preset[];
	let open = false;
</script>

<Select.Root bind:open positioning={{ sameWidth: false, placement: "bottom" }}>
	<Select.Trigger
		class={cn(
			buttonVariants({ variant: "outline" }),
			"flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
		)}
	>
		<Select.Value placeholder="Load a preset..." />
	</Select.Trigger>
	<Select.Content class="w-[300px] p-0">
		<Select.Group>
			<Select.Label>Examples</Select.Label>
			{#each presets as preset}
				<Select.Item value={preset.id} label={preset.name}>
					{preset.name}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
