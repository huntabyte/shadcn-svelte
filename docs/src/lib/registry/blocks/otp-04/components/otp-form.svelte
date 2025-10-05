<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("flex flex-col gap-6 md:min-h-[450px]", className)} {...restProps}>
	<Card.Root class="flex-1 overflow-hidden p-0">
		<Card.Content class="grid flex-1 p-0 md:grid-cols-2">
			<form class="flex flex-col items-center justify-center p-6 md:p-8">
				<Field.Group>
					<Field.Field class="items-center text-center">
						<h1 class="text-2xl font-bold">Enter verification code</h1>
						<p class="text-muted-foreground text-balance text-sm">
							We sent a 6-digit code to your email
						</p>
					</Field.Field>
					<Field.Field>
						<Field.Label for="otp" class="sr-only">Verification code</Field.Label>
						<InputOTP.Root maxlength={6} id="otp" required class="gap-4">
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
						<Field.Description class="text-center">
							Enter the 6-digit code sent to your email.
						</Field.Description>
					</Field.Field>
					<Field.Field>
						<Button type="submit">Verify</Button>
						<Field.Description class="text-center">
							Didn't receive the code? <a href="#/">Resend</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</form>
			<div class="bg-muted relative hidden md:block">
				<img
					src="/placeholder.svg"
					alt=""
					class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</Card.Content>
	</Card.Root>
	<Field.Description class="text-center">
		By clicking continue, you agree to our <a href="#/">Terms of Service</a>
		and <a href="#/">Privacy Policy</a>.
	</Field.Description>
</div>
