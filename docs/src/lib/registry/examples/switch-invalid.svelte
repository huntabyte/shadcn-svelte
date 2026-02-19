<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center space-x-2">
		<Switch id="terms-switch" aria-invalid="true" class="aria-[invalid=true]:data-[state=unchecked]:border-destructive" />
		<Label for="terms-switch">Accept terms and conditions</Label>
	</div>
	<p class="text-destructive text-sm">You must accept the terms to continue.</p>
</div>
