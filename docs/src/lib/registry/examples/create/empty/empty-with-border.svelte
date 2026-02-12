<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Border">
	<Empty.Root class="border">
		<Empty.Header>
			<Empty.Title>404 - Not Found</Empty.Title>
			<Empty.Description>
				The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need
				below.
			</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<InputGroup.Root class="w-3/4">
				<InputGroup.Input placeholder="Try searching for pages..." />
				<InputGroup.Addon>
					<IconPlaceholder
						lucide="CircleDashedIcon"
						tabler="IconCircleDashed"
						hugeicons="DashedLineCircleIcon"
						phosphor="CircleDashedIcon"
						remixicon="RiLoaderLine"
					/>
				</InputGroup.Addon>
				<InputGroup.Addon align="inline-end">
					<Kbd.Root>/</Kbd.Root>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Empty.Description>
				Need help? <a href="#/">Contact support</a>
			</Empty.Description>
		</Empty.Content>
	</Empty.Root>
</Example>
