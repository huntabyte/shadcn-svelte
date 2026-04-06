<script lang="ts">
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root class="mx-auto max-w-md">
	<Card.Header>
		<Card.Title>Verify your login</Card.Title>
		<Card.Description>
			Enter the verification code we sent to your email address:
			<span class="font-medium">m@example.com</span>.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Field.Field>
			<div class="flex items-center justify-between">
				<Field.Label for="otp-verification">Verification code</Field.Label>
				<Button variant="outline" size="sm">
					<RefreshCwIcon />
					Resend Code
				</Button>
			</div>
			<InputOTP.Root id="otp-verification" maxlength={6} required>
				{#snippet children({ cells })}
					<InputOTP.Group
						class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
					>
						{#each cells.slice(0, 3) as cell (cell)}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
					<InputOTP.Separator class="mx-2" />
					<InputOTP.Group
						class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
					>
						{#each cells.slice(3, 6) as cell (cell)}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
			<Field.Description>
				<a href="#">I no longer have access to this email address.</a>
			</Field.Description>
		</Field.Field>
	</Card.Content>
	<Card.Footer>
		<Field.Field>
			<Button type="submit" class="w-full">Verify</Button>
			<div class="text-muted-foreground text-sm">
				Having trouble signing in?
				<a href="#" class="underline underline-offset-4 transition-colors hover:text-primary">
					Contact support
				</a>
			</div>
		</Field.Field>
	</Card.Footer>
</Card.Root>
