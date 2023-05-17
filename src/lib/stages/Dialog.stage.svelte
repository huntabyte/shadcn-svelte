<script lang="ts">
	import { Stage } from "svelte-stage";
	import StageBox from "./StageBox.svelte";
	import { Button } from "$components/ui";
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from "$components/ui/dialog";
	import Label from "radix-svelte/dist/components/Select/label.svelte";
</script>

<Stage component="Dialog">
	<StageBox>
		<Dialog>
			<DialogTrigger>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent class="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Name</Label>
						<!-- <Input id="name" value="Pedro Duarte" class="col-span-3" /> -->
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Username</Label>
						<!-- <Input id="username" value="@peduarte" class="col-span-3" /> -->
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</StageBox>
</Stage>
