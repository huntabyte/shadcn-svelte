<script lang="ts">
	import CheckCircleIcon from "@lucide/svelte/icons/circle-check";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<div class="flex flex-col gap-4 w-full">
	<Alert.Root class="border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-700 dark:[&>svg]:text-blue-400">
		<CheckCircleIcon class="size-4" />
		<Alert.Title>Info</Alert.Title>
		<Alert.Description>Your changes have been saved successfully.</Alert.Description>
	</Alert.Root>
	<Alert.Root class="border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-700 dark:[&>svg]:text-green-400">
		<CheckCircleIcon class="size-4" />
		<Alert.Title>Success</Alert.Title>
		<Alert.Description>Your account has been created.</Alert.Description>
	</Alert.Root>
</div>
