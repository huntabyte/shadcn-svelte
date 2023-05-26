<script lang="ts">
	import { Checkbox } from "$components/ui/checkbox";
</script>

<div class="flex items-center space-x-2">
	<Checkbox id="terms" disabled />
	<label
		for="terms2"
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
		Accept terms and conditions
	</label>
</div>
