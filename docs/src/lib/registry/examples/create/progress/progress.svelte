<script lang="ts">
	import ProgressBar from "./progress-bar.svelte";
	import ProgressControlled from "./progress-controlled.svelte";
	import ProgressFileUploadList from "./progress-file-upload-list.svelte";
	import ProgressWithLabel from "./progress-with-label.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ProgressBar />
	<ProgressWithLabel />
	<ProgressControlled />
	<ProgressFileUploadList />
</ExampleWrapper>
