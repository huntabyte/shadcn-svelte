<script lang="ts">
	import InputOtpPattern from "./input-otp-pattern.svelte";
	import InputOtpSimple from "./input-otp-simple.svelte";
	import InputOtpWithSeparator from "./input-otp-with-separator.svelte";
	import InputOtpWithSpacing from "./input-otp-with-spacing.svelte";
</script>

<div class="flex flex-col flex-wrap gap-6 md:flex-row">
	<InputOtpSimple />
	<InputOtpPattern />
	<InputOtpWithSeparator />
	<InputOtpWithSpacing />
</div>
