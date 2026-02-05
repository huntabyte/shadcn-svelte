<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { REGEXP_ONLY_DIGITS } from "bits-ui";

	let value = $state("");
	let pinValue = $state("");
</script>

<Example title="OTP Input Fields">
	<Field.Group>
		<Field.Field>
			<Field.Label for="otp-basic">Verification Code</Field.Label>
			<InputOTP.Root id="otp-basic" maxlength={6}>
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells as cell (cell)}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="otp-with-desc">Enter OTP</Field.Label>
			<InputOTP.Root id="otp-with-desc" maxlength={6} bind:value>
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells as cell (cell)}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
			<Field.Description>Enter the 6-digit code sent to your email.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="otp-separator">Two-Factor Authentication</Field.Label>
			<InputOTP.Root id="otp-separator" maxlength={6}>
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
			<Field.Description>Enter the code from your authenticator app.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="otp-pin">PIN Code</Field.Label>
			<InputOTP.Root
				id="otp-pin"
				maxlength={4}
				pattern={REGEXP_ONLY_DIGITS}
				bind:value={pinValue}
			>
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells as cell (cell)}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
			<Field.Description>Enter your 4-digit PIN (numbers only).</Field.Description>
		</Field.Field>
		<Field.Field data-invalid>
			<Field.Label for="otp-invalid">Invalid OTP</Field.Label>
			<InputOTP.Root id="otp-invalid" maxlength={6}>
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells as cell (cell)}
							<InputOTP.Slot {cell} aria-invalid />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
			<Field.Description>This OTP field contains validation errors.</Field.Description>
		</Field.Field>
		<Field.Field data-disabled>
			<Field.Label for="otp-disabled-field">Disabled OTP</Field.Label>
			<InputOTP.Root id="otp-disabled-field" maxlength={6} disabled>
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells as cell (cell)}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
			<Field.Description>This OTP field is currently disabled.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
