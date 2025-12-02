<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import type { ComponentProps } from "svelte";

	let { ...props }: ComponentProps<typeof Card.Root> = $props();
</script>

<Card.Root {...props}>
	<Card.Header>
		<Card.Title>Enter verification code</Card.Title>
		<Card.Description>We sent a 6-digit code to your email.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<Field.Group>
				<Field.Field>
					<Field.Label for="otp">Verification code</Field.Label>
					<InputOTP.Root maxlength={6} id="otp" required>
						{#snippet children({ cells })}
							<InputOTP.Group
								class="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border"
							>
								{#each cells as cell (cell)}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
					<Field.Description>
						Enter the 6-digit code sent to your email.
					</Field.Description>
				</Field.Field>
				<Field.Group>
					<Button type="submit">Verify</Button>
					<Field.Description class="text-center">
						Didn't receive the code? <a href="#/">Resend</a>
					</Field.Description>
				</Field.Group>
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>
