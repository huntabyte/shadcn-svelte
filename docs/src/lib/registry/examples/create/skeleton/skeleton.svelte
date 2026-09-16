<script lang="ts">
	import SkeletonAvatar from "./skeleton-avatar.svelte";
	import SkeletonCard from "./skeleton-card.svelte";
	import SkeletonForm from "./skeleton-form.svelte";
	import SkeletonTable from "./skeleton-table.svelte";
	import SkeletonText from "./skeleton-text.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<SkeletonAvatar />
	<SkeletonCard />
	<SkeletonText />
	<SkeletonForm />
	<SkeletonTable />
</ExampleWrapper>
