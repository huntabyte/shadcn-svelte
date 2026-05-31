<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Badge with Icon">
	<div class="flex flex-wrap items-center gap-2">
		<Avatar.Root size="sm">
			<Avatar.Image src="https://github.com/pranathip.png" alt="@pranathip" />
			<Avatar.Fallback>PP</Avatar.Fallback>
			<Avatar.Badge>
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
				/>
			</Avatar.Badge>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/pranathip.png" alt="@pranathip" />
			<Avatar.Fallback>PP</Avatar.Fallback>
			<Avatar.Badge>
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
				/>
			</Avatar.Badge>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Image src="https://github.com/pranathip.png" alt="@pranathip" />
			<Avatar.Fallback>PP</Avatar.Fallback>
			<Avatar.Badge>
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
				/>
			</Avatar.Badge>
		</Avatar.Root>
	</div>
	<div class="flex flex-wrap items-center gap-2">
		<Avatar.Root size="sm">
			<Avatar.Fallback>PP</Avatar.Fallback>
			<Avatar.Badge>
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
				/>
			</Avatar.Badge>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Fallback>PP</Avatar.Fallback>
			<Avatar.Badge>
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
				/>
			</Avatar.Badge>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Fallback>PP</Avatar.Fallback>
			<Avatar.Badge>
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
				/>
			</Avatar.Badge>
		</Avatar.Root>
	</div>
</Example>
