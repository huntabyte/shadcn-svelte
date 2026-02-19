<script lang="ts">
	import InfoIcon from "@lucide/svelte/icons/info";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Alert.Root>
	<InfoIcon class="size-4" />
	<Alert.Title>New feature available</Alert.Title>
	<Alert.Description>
		A new version of the dashboard is available with improved performance.
	</Alert.Description>
	<Alert.Action>
		<a href="##" class={buttonVariants({ variant: "outline", size: "sm" })}>Update now</a>
	</Alert.Action>
</Alert.Root>
