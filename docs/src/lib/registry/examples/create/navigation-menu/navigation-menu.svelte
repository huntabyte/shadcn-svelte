<script lang="ts">
	import NavigationMenuWithViewport from "./navigation-menu-with-viewport.svelte";
	import NavigationMenuWithoutViewport from "./navigation-menu-without-viewport.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1">
	<NavigationMenuWithViewport />
	<NavigationMenuWithoutViewport />
</ExampleWrapper>
