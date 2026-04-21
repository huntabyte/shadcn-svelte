<script lang="ts">
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={buttonVariants({ variant: "destructive" })}>
		Delete Chat
	</AlertDialog.Trigger>
	<AlertDialog.Content size="sm">
		<AlertDialog.Header>
			<AlertDialog.Media
				class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
			>
				<Trash2Icon />
			</AlertDialog.Media>
			<AlertDialog.Title>Delete chat?</AlertDialog.Title>
			<AlertDialog.Description>
				This will permanently delete this chat conversation. View
				<a href="/settings">Settings</a> delete any memories saved during this chat.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class={buttonVariants({ variant: "outline" })}>
				Cancel
			</AlertDialog.Cancel>
			<AlertDialog.Action class={buttonVariants({ variant: "destructive" })}>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
