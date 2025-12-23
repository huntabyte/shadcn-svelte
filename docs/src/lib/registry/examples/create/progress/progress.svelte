<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import ProgressBar from "./progress-bar.svelte";
	import ProgressWithLabel from "./progress-with-label.svelte";
	import ProgressControlled from "./progress-controlled.svelte";
	import ProgressFileUploadList from "./progress-file-upload-list.svelte";
</script>

<ExampleWrapper class="w-full max-w-4xl lg:grid-cols-1 2xl:max-w-4xl 2xl:grid-cols-1">
	<ProgressBar />
	<ProgressWithLabel />
	<ProgressControlled />
	<ProgressFileUploadList />
</ExampleWrapper>
