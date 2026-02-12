<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import BadgeVariants from "./badge-variants.svelte";
	import BadgeWithIconLeft from "./badge-with-icon-left.svelte";
	import BadgeWithIconRight from "./badge-with-icon-right.svelte";
	import BadgeWithSpinner from "./badge-with-spinner.svelte";
	import BadgeAsLink from "./badge-as-link.svelte";
	import BadgeLongText from "./badge-long-text.svelte";
	import BadgeCustomColors from "./badge-custom-colors.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1">
	<BadgeVariants />
	<BadgeWithIconLeft />
	<BadgeWithIconRight />
	<BadgeWithSpinner />
	<BadgeAsLink />
	<BadgeLongText />
	<BadgeCustomColors />
</ExampleWrapper>
