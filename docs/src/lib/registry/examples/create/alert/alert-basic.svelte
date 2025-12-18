<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<Example title="Basic">
	<div class="mx-auto flex w-full max-w-lg flex-col gap-4">
		<Alert.Root>
			<Alert.Title>Success! Your changes have been saved.</Alert.Title>
		</Alert.Root>
		<Alert.Root>
			<Alert.Title>Success! Your changes have been saved.</Alert.Title>
			<Alert.Description>
				This is an alert with title and description.
			</Alert.Description>
		</Alert.Root>
		<Alert.Root>
			<Alert.Description>
				This one has a description only. No title. No icon.
			</Alert.Description>
		</Alert.Root>
	</div>
</Example>
