<script lang="ts">
	import InputOTPAlphanumeric from "./input-otp-alphanumeric.svelte";
	import InputOTPDisabled from "./input-otp-disabled.svelte";
	import InputOTPForm from "./input-otp-form.svelte";
	import InputOTPFourDigits from "./input-otp-four-digits.svelte";
	import InputOTPInvalid from "./input-otp-invalid.svelte";
	import InputOTPPattern from "./input-otp-pattern.svelte";
	import InputOTPSimple from "./input-otp-simple.svelte";
	import InputOTPWithSeparator from "./input-otp-with-separator.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<InputOTPForm />
	<InputOTPSimple />
	<InputOTPPattern />
	<InputOTPWithSeparator />
	<InputOTPAlphanumeric />
	<InputOTPDisabled />
	<InputOTPFourDigits />
	<InputOTPInvalid />
</ExampleWrapper>
