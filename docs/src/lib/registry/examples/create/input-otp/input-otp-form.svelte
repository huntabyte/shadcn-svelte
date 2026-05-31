<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Button from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Form">
	<Card.Root class="mx-auto max-w-md">
		<Card.Header>
			<Card.Title>Verify your login</Card.Title>
			<Card.Description>
				Enter the verification code we sent to your email address:
				<span class="font-medium">m@example.com</span>.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Field.Field>
					<div class="flex items-center justify-between">
						<Field.Label for="otp-verification">Verification code</Field.Label>
						<Button.Root variant="outline" size="xs">
							<IconPlaceholder
								lucide="RefreshCwIcon"
								hugeicons="RefreshIcon"
								tabler="IconRefresh"
								phosphor="ArrowClockwiseIcon"
								remixicon="RiRefreshLine"
								data-icon="inline-start"
							/>
							Resend Code
						</Button.Root>
					</div>
					<InputOTP.Root maxlength={6} id="otp-verification" required>
						{#snippet children({ cells })}
							<InputOTP.Group
								class="style-nova:*:data-[slot=input-otp-slot]:h-12 style-nova:*:data-[slot=input-otp-slot]:w-11 style-vega:*:data-[slot=input-otp-slot]:h-16 style-maia:*:data-[slot=input-otp-slot]:h-16 style-vega:*:data-[slot=input-otp-slot]:w-12 style-maia:*:data-[slot=input-otp-slot]:w-12 style-mira:*:data-[slot=input-otp-slot]:h-12 style-lyra:*:data-[slot=input-otp-slot]:h-12 style-lyra:*:data-[slot=input-otp-slot]:w-11 style-mira:*:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
							>
								{#each cells.slice(0, 3) as cell (cell)}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
							<InputOTP.Separator />
							<InputOTP.Group
								class="style-nova:*:data-[slot=input-otp-slot]:h-12 style-nova:*:data-[slot=input-otp-slot]:w-11 style-vega:*:data-[slot=input-otp-slot]:h-16 style-maia:*:data-[slot=input-otp-slot]:h-16 style-vega:*:data-[slot=input-otp-slot]:w-12 style-maia:*:data-[slot=input-otp-slot]:w-12 style-mira:*:data-[slot=input-otp-slot]:h-12 style-lyra:*:data-[slot=input-otp-slot]:h-12 style-lyra:*:data-[slot=input-otp-slot]:w-11 style-mira:*:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
							>
								{#each cells.slice(3, 6) as cell (cell)}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
					<Field.Description>
						<a href="#/">I no longer have access to this email address.</a>
					</Field.Description>
				</Field.Field>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button.Root type="submit" class="w-full">Verify</Button.Root>
			<div class="text-muted-foreground text-sm">
				Having trouble signing in?
				<a
					href="#/"
					class="hover:text-primary underline underline-offset-4 transition-colors"
				>
					Contact support
				</a>
			</div>
		</Card.Footer>
	</Card.Root>
</Example>
