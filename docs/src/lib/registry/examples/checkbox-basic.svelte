<script lang="ts">
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<div class="flex items-center gap-3">
	<Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
	<Label for="terms-checkbox-basic">Accept terms and conditions</Label>
</div>
