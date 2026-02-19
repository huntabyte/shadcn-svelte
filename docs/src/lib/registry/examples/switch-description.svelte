<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<div class="flex items-center justify-between rounded-lg border p-4 gap-4 max-w-sm">
	<div class="space-y-0.5">
		<Label for="marketing" class="text-base font-medium">Marketing emails</Label>
		<p class="text-muted-foreground text-sm">Receive emails about new products and updates.</p>
	</div>
	<Switch id="marketing" />
</div>
