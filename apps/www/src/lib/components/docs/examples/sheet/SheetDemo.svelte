<script lang="ts">
	import { Button } from "$components/ui/button";
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";
	import {
		Sheet,
		SheetClose,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from "$components/ui/sheet";
</script>

<Sheet>
	<SheetTrigger>
		<Button variant="outline">Open</Button>
	</SheetTrigger>
	<SheetContent position="right" size="sm">
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>
				Make changes to your profile here. Click save when you're done.
			</SheetDescription>
		</SheetHeader>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" value="Pedro Duarte" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Username</Label>
				<Input id="username" value="@peduarte" class="col-span-3" />
			</div>
		</div>
		<SheetFooter>
			<SheetClose>
				<Button type="submit">Save changes</Button>
			</SheetClose>
		</SheetFooter>
	</SheetContent>
</Sheet>
