<script lang="ts">
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import { Label } from "@/registry/new-york/ui/label";
</script>

<div class="items-top flex space-x-2">
	<Checkbox id="terms1" />
	<div class="grid gap-1.5 leading-none">
		<Label
			for="terms1"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Accept terms and conditions
		</Label>
		<p class="text-sm text-muted-foreground">
			You agree to our Terms of Service and Privacy Policy.
		</p>
	</div>
</div>
