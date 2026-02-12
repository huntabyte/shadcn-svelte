<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { REGEXP_ONLY_DIGITS } from "bits-ui";
</script>

<Example title="Digits Only">
	<Field.Field>
		<Field.Label for="digits-only">Digits Only</Field.Label>
		<InputOTP.Root id="digits-only" maxlength={6} pattern={REGEXP_ONLY_DIGITS}>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</Field.Field>
</Example>
