<script lang="ts">
	import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
