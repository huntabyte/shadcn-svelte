<script lang="ts">
	import KbdArrowKeys from "./kbd-arrow-keys.svelte";
	import KbdBasic from "./kbd-basic.svelte";
	import KbdGroupExample from "./kbd-group-example.svelte";
	import KbdInInputGroup from "./kbd-in-input-group.svelte";
	import KbdInTooltip from "./kbd-in-tooltip.svelte";
	import KbdModifierKeys from "./kbd-modifier-keys.svelte";
	import KbdWithIconsAndText from "./kbd-with-icons-and-text.svelte";
	import KbdWithIcons from "./kbd-with-icons.svelte";
	import KbdWithSamp from "./kbd-with-samp.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<KbdBasic />
	<KbdModifierKeys />
	<KbdGroupExample />
	<KbdArrowKeys />
	<KbdWithIcons />
	<KbdWithIconsAndText />
	<KbdInInputGroup />
	<KbdInTooltip />
	<KbdWithSamp />
</ExampleWrapper>
