<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";

	let value = $state("000000");
</script>

<Example title="Invalid State">
	<Field.Field>
		<Field.Label for="invalid">Invalid State</Field.Label>
		<Field.Description>Example showing the invalid error state.</Field.Description>
		<InputOTP.Root id="invalid" maxlength={6} bind:value>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells.slice(0, 2) as cell (cell)}
						<InputOTP.Slot {cell} aria-invalid />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(2, 4) as cell (cell)}
						<InputOTP.Slot {cell} aria-invalid />
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(4, 6) as cell (cell)}
						<InputOTP.Slot {cell} aria-invalid />
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
		<Field.Error errors={[{ message: "Invalid code. Please try again." }]} />
	</Field.Field>
</Example>
