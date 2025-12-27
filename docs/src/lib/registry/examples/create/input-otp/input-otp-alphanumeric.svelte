<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<Example title="Alphanumeric">
	<Field.Field>
		<Field.Label for="alphanumeric">Alphanumeric</Field.Label>
		<Field.Description>Accepts both letters and numbers.</Field.Description>
		<InputOTP.Root id="alphanumeric" maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells.slice(0, 3) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(3, 6) as cell (cell)}
						<InputOTP.Slot {cell} />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</Field.Field>
</Example>
