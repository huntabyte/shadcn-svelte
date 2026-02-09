<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons">
	<div class="mx-auto flex w-full max-w-lg flex-col gap-4">
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<Alert.Title>
				Let&apos;s try one with icon, title and a <a href="#/">link</a>.
			</Alert.Title>
		</Alert.Root>
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<Alert.Description>
				This one has an icon and a description only. No title.
				<a href="#/">But it has a link</a> and a <a href="#/">second link</a>.
			</Alert.Description>
		</Alert.Root>

		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<Alert.Title>Success! Your changes have been saved</Alert.Title>
			<Alert.Description>
				This is an alert with icon, title and description.
			</Alert.Description>
		</Alert.Root>
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<Alert.Title>
				This is a very long alert title that demonstrates how the component handles extended
				text content and potentially wraps across multiple lines
			</Alert.Title>
		</Alert.Root>
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<Alert.Description>
				This is a very long alert description that demonstrates how the component handles
				extended text content and potentially wraps across multiple lines
			</Alert.Description>
		</Alert.Root>
		<Alert.Root>
			<IconPlaceholder
				lucide="CircleAlertIcon"
				tabler="IconExclamationCircle"
				hugeicons="AlertCircleIcon"
				phosphor="WarningCircleIcon"
				remixicon="RiErrorWarningLine"
			/>
			<Alert.Title>
				This is an extremely long alert title that spans multiple lines to demonstrate how
				the component handles very lengthy headings while maintaining readability and proper
				text wrapping behavior
			</Alert.Title>
			<Alert.Description>
				This is an equally long description that contains detailed information about the
				alert. It shows how the component can accommodate extensive content while preserving
				proper spacing, alignment, and readability across different screen sizes and
				viewport widths. This helps ensure the user experience remains consistent regardless
				of the content length.
			</Alert.Description>
		</Alert.Root>
	</div>
</Example>
