<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Destructive" class="items-center">
	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button variant="destructive">Delete Chat</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content size="sm">
			<AlertDialog.Header>
				<AlertDialog.Media
					class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
				>
					<IconPlaceholder
						lucide="Trash2Icon"
						tabler="IconTrash"
						hugeicons="Delete02Icon"
						phosphor="TrashIcon"
						remixicon="RiDeleteBinLine"
					/>
				</AlertDialog.Media>
				<AlertDialog.Title>Delete chat?</AlertDialog.Title>
				<AlertDialog.Description>
					This will permanently delete this chat conversation. View
					<a href="#/">Settings</a> delete any memories saved during this chat.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel variant="ghost">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action variant="destructive">Delete</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</Example>
