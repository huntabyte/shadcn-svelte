<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import InputOTPForm from "./input-otp-form.svelte";
	import InputOTPSimple from "./input-otp-simple.svelte";
	import InputOTPPattern from "./input-otp-pattern.svelte";
	import InputOTPWithSeparator from "./input-otp-with-separator.svelte";
	import InputOTPAlphanumeric from "./input-otp-alphanumeric.svelte";
	import InputOTPDisabled from "./input-otp-disabled.svelte";
	import InputOTPFourDigits from "./input-otp-four-digits.svelte";
	import InputOTPInvalid from "./input-otp-invalid.svelte";
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
