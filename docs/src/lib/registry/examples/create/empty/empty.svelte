<script lang="ts">
	import EmptyBasic from "./empty-basic.svelte";
	import EmptyInCard from "./empty-in-card.svelte";
	import EmptyWithBorder from "./empty-with-border.svelte";
	import EmptyWithIcon from "./empty-with-icon.svelte";
	import EmptyWithMutedBackgroundAlt from "./empty-with-muted-background-alt.svelte";
	import EmptyWithMutedBackground from "./empty-with-muted-background.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<EmptyBasic />
	<EmptyWithMutedBackground />
	<EmptyWithBorder />
	<EmptyWithIcon />
	<EmptyWithMutedBackgroundAlt />
	<EmptyInCard />
</ExampleWrapper>
