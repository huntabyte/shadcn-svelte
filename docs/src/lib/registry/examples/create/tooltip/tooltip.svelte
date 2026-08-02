<script lang="ts">
	import TooltipBasic from "./tooltip-basic.svelte";
	import TooltipDisabled from "./tooltip-disabled.svelte";
	import TooltipFormatted from "./tooltip-formatted.svelte";
	import TooltipLongContent from "./tooltip-long-content.svelte";
	import TooltipOnLink from "./tooltip-on-link.svelte";
	import TooltipSides from "./tooltip-sides.svelte";
	import TooltipWithIcon from "./tooltip-with-icon.svelte";
	import TooltipWithKeyboard from "./tooltip-with-keyboard.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<TooltipBasic />
	<TooltipSides />
	<TooltipWithIcon />
	<TooltipLongContent />
	<TooltipDisabled />
	<TooltipWithKeyboard />
	<TooltipOnLink />
	<TooltipFormatted />
</ExampleWrapper>
