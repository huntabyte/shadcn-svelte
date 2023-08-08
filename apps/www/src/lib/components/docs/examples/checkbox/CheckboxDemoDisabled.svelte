<script lang="ts">
	import { Checkbox } from "@/registry/default/ui/checkbox";
	import { Label } from "@/registry/default/ui/label";
</script>

<div class="flex items-center space-x-2">
	<Checkbox id="terms" disabled />
	<Label
		for="terms2"
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
		Accept terms and conditions
	</Label>
</div>
