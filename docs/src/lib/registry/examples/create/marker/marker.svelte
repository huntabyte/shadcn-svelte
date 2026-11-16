<script lang="ts">
	import MarkerAccordion from "./marker-accordion.svelte";
	import MarkerBorder from "./marker-border.svelte";
	import MarkerDrawer from "./marker-drawer.svelte";
	import MarkerMarkers from "./marker-markers.svelte";
	import MarkerSeparator from "./marker-separator.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<MarkerMarkers />
	<MarkerBorder />
	<MarkerSeparator />
	<MarkerAccordion />
	<MarkerDrawer />
</ExampleWrapper>
