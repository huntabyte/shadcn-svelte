<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Actions">
	<div class="mx-auto flex w-full max-w-lg flex-col gap-4">
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
			/>
			<Alert.Title>The selected emails have been marked as spam.</Alert.Title>
			<Alert.Action>
				<Button size="xs">Undo</Button>
			</Alert.Action>
		</Alert.Root>
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
			/>
			<Alert.Title>The selected emails have been marked as spam.</Alert.Title>
			<Alert.Description>
				This is a very long alert title that demonstrates how the component handles extended
				text content.
			</Alert.Description>
			<Alert.Action>
				<Badge variant="secondary">Badge</Badge>
			</Alert.Action>
		</Alert.Root>
	</div>
</Example>
