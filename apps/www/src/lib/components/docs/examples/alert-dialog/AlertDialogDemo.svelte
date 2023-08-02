<script lang="ts">
	import { AlertDialog } from "$components/ui/alert-dialog";
	import { Button } from "$components/ui/button";
</script>

<AlertDialog let:trigger>
	<Button builders={[trigger]} variant="outline">Show Dialog</Button>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your
				account and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog>
