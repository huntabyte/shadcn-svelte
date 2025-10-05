<script lang="ts">
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputOTP from "$lib/registry/ui/input-otp/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
	<form>
		<Field.Group>
			<div class="flex flex-col items-center gap-2 text-center">
				<a href="#/" class="flex flex-col items-center gap-2 font-medium">
					<div class="flex size-8 items-center justify-center rounded-md">
						<GalleryVerticalEndIcon class="size-6" />
					</div>
					<span class="sr-only">Acme Inc.</span>
				</a>
				<h1 class="text-xl font-bold">Enter verification code</h1>
				<Field.Description>We sent a 6-digit code to your email address</Field.Description>
			</div>
			<Field.Field>
				<Field.Label for="otp" class="sr-only">Verification code</Field.Label>
				<InputOTP.Root maxlength={6} id="otp" required class="gap-4">
					{#snippet children({ cells })}
						<InputOTP.Group
							class="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl"
						>
							{#each cells.slice(0, 3) as cell (cell)}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group
							class="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl"
						>
							{#each cells.slice(3, 6) as cell (cell)}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
				<Field.Description class="text-center">
					Didn't receive the code? <a href="#/">Resend</a>
				</Field.Description>
			</Field.Field>
			<Field.Field>
				<Button type="submit">Verify</Button>
			</Field.Field>
		</Field.Group>
	</form>
	<Field.Description class="px-6 text-center">
		By clicking continue, you agree to our <a href="#/">Terms of Service</a>
		and <a href="#/">Privacy Policy</a>.
	</Field.Description>
</div>
