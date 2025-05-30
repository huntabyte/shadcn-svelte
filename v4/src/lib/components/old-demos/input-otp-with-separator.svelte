<script lang="ts">
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	let value = $state("123456");
</script>

<div class="grid gap-2">
	<Label for="with-separator">With Separator</Label>
	<InputOTP.Root id="with-separator" maxlength={6} bind:value>
		{#snippet children({ cells })}
			<InputOTP.Group>
				{#each cells.slice(0, 2) as cell (cell)}
					<InputOTP.Slot {cell} />
				{/each}
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				{#each cells.slice(2, 4) as cell (cell)}
					<InputOTP.Slot {cell} />
				{/each}
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				{#each cells.slice(4, 6) as cell (cell)}
					<InputOTP.Slot {cell} />
				{/each}
			</InputOTP.Group>
		{/snippet}
	</InputOTP.Root>
</div>
