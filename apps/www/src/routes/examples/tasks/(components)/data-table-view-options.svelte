<script lang="ts">
	import { MixerHorizontal } from "radix-icons-svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
</script>

<DropdownMenu.Root positioning={{ placement: "bottom-end" }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="outline"
			builders={[builder]}
			class="ml-auto hidden h-8 lg:flex"
		>
			<MixerHorizontal class="mr-2 h-4 w-4" />
			View
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[150px]">
		<DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
		<DropdownMenu.Separator />
	</DropdownMenu.Content>
</DropdownMenu.Root>
