<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Vertical Menu">
	<div class="flex items-center gap-2 text-sm md:gap-4 style-lyra:text-xs/relaxed">
		<div class="flex flex-col gap-1">
			<span class="font-medium">Settings</span>
			<span class="text-xs text-muted-foreground"> Manage preferences </span>
		</div>
		<Separator orientation="vertical" />
		<div class="flex flex-col gap-1">
			<span class="font-medium">Account</span>
			<span class="text-xs text-muted-foreground"> Profile & security </span>
		</div>
		<Separator orientation="vertical" />
		<div class="flex flex-col gap-1">
			<span class="font-medium">Help</span>
			<span class="text-xs text-muted-foreground">Support & docs</span>
		</div>
	</div>
</Example>
