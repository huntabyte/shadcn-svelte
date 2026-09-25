<script lang="ts">
	import CircleFadingPlusIcon from "@lucide/svelte/icons/circle-fading-plus";
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
		Share Project
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Media>
				<CircleFadingPlusIcon />
			</AlertDialog.Media>
			<AlertDialog.Title>Share this project?</AlertDialog.Title>
			<AlertDialog.Description>
				Anyone with the link will be able to view and edit this project.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Share</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
