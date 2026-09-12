<script lang="ts">
	import AlertBasic from "./alert-basic.svelte";
	import AlertDestructive from "./alert-destructive.svelte";
	import AlertWithActions from "./alert-with-actions.svelte";
	import AlertWithIcons from "./alert-with-icons.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1">
	<AlertBasic />
	<AlertWithIcons />
	<AlertDestructive />
	<AlertWithActions />
</ExampleWrapper>
