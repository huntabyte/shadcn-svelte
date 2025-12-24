<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import SeparatorHorizontal from "./separator-horizontal.svelte";
	import SeparatorVertical from "./separator-vertical.svelte";
	import SeparatorVerticalMenu from "./separator-vertical-menu.svelte";
	import SeparatorInList from "./separator-in-list.svelte";
</script>

<ExampleWrapper class="w-full max-w-4xl lg:grid-cols-1 2xl:max-w-4xl 2xl:grid-cols-1">
	<SeparatorHorizontal />
	<SeparatorVertical />
	<SeparatorVerticalMenu />
	<SeparatorInList />
</ExampleWrapper>
