<script lang="ts">
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";

	let value = $state("123456");
</script>

<InputOTP.Root maxlength={6} bind:value>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
