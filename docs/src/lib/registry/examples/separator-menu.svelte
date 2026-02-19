<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<div class="w-[200px] rounded-md border shadow-sm">
	<div class="px-2 py-1.5 text-sm font-semibold">My Account</div>
	<Separator />
	<div class="p-1">
		<button class="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Profile</button>
		<button class="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Billing</button>
		<button class="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Settings</button>
	</div>
	<Separator />
	<div class="p-1">
		<button class="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Log out</button>
	</div>
</div>
