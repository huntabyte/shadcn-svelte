<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<div class="w-[200px] rounded-md border shadow-sm">
	<div class="px-2 py-1.5 text-sm font-semibold">My Account</div>
	<Separator />
	<div class="p-1">
		<button class="hover:bg-accent w-full rounded px-2 py-1.5 text-left text-sm">Profile</button
		>
		<button class="hover:bg-accent w-full rounded px-2 py-1.5 text-left text-sm">Billing</button
		>
		<button class="hover:bg-accent w-full rounded px-2 py-1.5 text-left text-sm"
			>Settings</button
		>
	</div>
	<Separator />
	<div class="p-1">
		<button class="hover:bg-accent w-full rounded px-2 py-1.5 text-left text-sm">Log out</button
		>
	</div>
</div>
