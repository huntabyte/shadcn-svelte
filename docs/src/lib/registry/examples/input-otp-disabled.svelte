<script lang="ts">
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6} disabled>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
