<script lang="ts">
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<div class="grid gap-2">
	<Label for="with-spacing">With Spacing</Label>
	<InputOTP.Root maxlength={6}>
		{#snippet children({ cells })}
			<InputOTP.Group
				class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border"
			>
				{#each cells.slice(0, 4) as cell (cell)}
					<InputOTP.Slot {cell} aria-invalid="true" />
				{/each}
			</InputOTP.Group>
		{/snippet}
	</InputOTP.Root>
</div>
