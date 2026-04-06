<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		pin: z.string().length(6, { message: "Your verification code must be exactly 6 digits." }),
	});
</script>

<script lang="ts">
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = superForm(defaults({ pin: "" }, zod4(formSchema)), {
		SPA: true,
		validators: zod4(formSchema),
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, errors, enhance } = form;
</script>

<form method="POST" use:enhance>
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
				<InputOTP.Root
					id="otp-verification"
					maxlength={6}
					bind:value={$formData.pin}
					required
				>
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
				<Field.Error errors={($errors.pin ?? []).map((m) => ({ message: m }))} />
				<Field.Description>
					<button type="button" class="hover:underline"
						>I no longer have access to this email address.</button
					>
				</Field.Description>
			</Field.Field>
		</Card.Content>
		<Card.Footer>
			<Field.Field>
				<Button type="submit" class="w-full">Verify</Button>
				<div class="text-muted-foreground text-sm">
					Having trouble signing in?
					<button
						type="button"
						class="hover:text-primary underline underline-offset-4 transition-colors"
					>
						Contact support
					</button>
				</div>
			</Field.Field>
		</Card.Footer>
	</Card.Root>
</form>
