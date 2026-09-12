<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import { cn } from "cn";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: InputOTPPrimitive.RootProps = $props();
</script>

<InputOTPPrimitive.Root
	bind:ref
	bind:value
	data-slot="input-otp"
	spellcheck={false}
	class={cn(
		"cn-input-otp flex items-center has-disabled:opacity-50",
		"cn-input-otp-input disabled:cursor-not-allowed",
		className
	)}
	{...restProps}
/>
