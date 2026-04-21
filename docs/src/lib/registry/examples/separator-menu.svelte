<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<div class="flex items-center gap-2 text-sm md:gap-4">
	<div class="flex flex-col gap-1">
		<span class="font-medium">Settings</span>
		<span class="text-muted-foreground text-xs">Manage preferences</span>
	</div>
	<Separator orientation="vertical" />
	<div class="flex flex-col gap-1">
		<span class="font-medium">Account</span>
		<span class="text-muted-foreground text-xs">Profile & security</span>
	</div>
	<Separator orientation="vertical" class="hidden md:block" />
	<div class="hidden flex-col gap-1 md:flex">
		<span class="font-medium">Help</span>
		<span class="text-muted-foreground text-xs">Support & docs</span>
	</div>
</div>
