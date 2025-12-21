<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import CardDefault from "./card-default.svelte";
	import CardSmall from "./card-small.svelte";
	import CardHeaderWithBorder from "./card-header-with-border.svelte";
	import CardFooterWithBorder from "./card-footer-with-border.svelte";
	import CardHeaderWithBorderSmall from "./card-header-with-border-small.svelte";
	import CardFooterWithBorderSmall from "./card-footer-with-border-small.svelte";
	import CardWithImage from "./card-with-image.svelte";
	import CardWithImageSmall from "./card-with-image-small.svelte";
	import CardLogin from "./card-login.svelte";
	import CardMeetingNotes from "./card-meeting-notes.svelte";
</script>

<ExampleWrapper>
	<CardDefault />
	<CardSmall />
	<CardHeaderWithBorder />
	<CardFooterWithBorder />
	<CardHeaderWithBorderSmall />
	<CardFooterWithBorderSmall />
	<CardWithImage />
	<CardWithImageSmall />
	<CardLogin />
	<CardMeetingNotes />
</ExampleWrapper>

