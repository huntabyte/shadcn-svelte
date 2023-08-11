<script lang="ts">
	import * as AlertDialog from "@/registry/new-york/ui/alert-dialog";
	import { buttonVariants } from "@/registry/new-york/ui/button";
	import { cn } from "$lib/utils";
	import { Trash2 } from "lucide-svelte";

	export let id: string;
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger
		class={cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0")}
	>
		<span class="sr-only">Open delete dialog</span>
		<Trash2 class="h-4 w-4" />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title
				>Are you sure you want to delete #{id}?</AlertDialog.Title
			>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your
				account and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class={buttonVariants({ variant: "destructive" })}
				>Delete</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
