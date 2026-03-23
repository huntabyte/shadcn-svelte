<script lang="ts">
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center space-x-2">
		<Checkbox
			id="terms-checkbox-invalid"
			aria-invalid="true"
			class="aria-[invalid=true]:border-destructive"
		/>
		<Label for="terms-checkbox-invalid">Accept terms and conditions</Label>
	</div>
	<p class="text-destructive text-sm">You must accept the terms to continue.</p>
</div>
