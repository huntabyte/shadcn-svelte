<script lang="ts">
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from "$components/ui/alert-dialog";
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { Trash2 } from "lucide-svelte";

	export let id: number;
</script>

<AlertDialog>
	<AlertDialogTrigger
		class={cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0")}
	>
		<span class="sr-only">Open delete dialog</span>
		<Trash2 class="h-4 w-4" />
	</AlertDialogTrigger>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle
				>Are you sure you want to delete #{id}?</AlertDialogTitle
			>
			<AlertDialogDescription>
				This action cannot be undone. This will permanently delete your
				account and remove your data from our servers.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction
				class={buttonVariants({ variant: "destructive" })}
				>Delete</AlertDialogAction
			>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
