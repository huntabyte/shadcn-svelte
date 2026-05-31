<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import AlertBasic from "./alert-basic.svelte";
	import AlertWithIcons from "./alert-with-icons.svelte";
	import AlertDestructive from "./alert-destructive.svelte";
	import AlertWithActions from "./alert-with-actions.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1">
	<AlertBasic />
	<AlertWithIcons />
	<AlertDestructive />
	<AlertWithActions />
</ExampleWrapper>
