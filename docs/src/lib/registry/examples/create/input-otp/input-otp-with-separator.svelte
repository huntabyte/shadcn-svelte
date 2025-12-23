<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";

	let value = $state("123456");
</script>

<Example title="With Separator">
	<Field.Field>
		<Field.Label for="with-separator">With Separator</Field.Label>
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
	</Field.Field>
</Example>
