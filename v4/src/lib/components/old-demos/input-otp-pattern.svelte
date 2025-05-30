<script lang="ts">
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { REGEXP_ONLY_DIGITS } from "bits-ui";
</script>

<div class="grid gap-2">
	<Label for="digits-only">Pattern</Label>
	<InputOTP.Root id="digits-only" maxlength={6} pattern={REGEXP_ONLY_DIGITS}>
		{#snippet children({ cells })}
			<InputOTP.Group>
				{#each cells as cell (cell)}
					<InputOTP.Slot {cell} />
				{/each}
			</InputOTP.Group>
		{/snippet}
	</InputOTP.Root>
</div>
