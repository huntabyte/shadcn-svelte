<script lang="ts">
	import SwitchBasic from "./switch-basic.svelte";
	import SwitchDisabled from "./switch-disabled.svelte";
	import SwitchSizes from "./switch-sizes.svelte";
	import SwitchWithDescription from "./switch-with-description.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<SwitchBasic />
	<SwitchWithDescription />
	<SwitchDisabled />
	<SwitchSizes />
</ExampleWrapper>
