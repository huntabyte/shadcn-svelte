<script lang="ts">
	import CardDefault from "./card-default.svelte";
	import CardFooterWithBorderSmall from "./card-footer-with-border-small.svelte";
	import CardFooterWithBorder from "./card-footer-with-border.svelte";
	import CardHeaderWithBorderSmall from "./card-header-with-border-small.svelte";
	import CardHeaderWithBorder from "./card-header-with-border.svelte";
	import CardLogin from "./card-login.svelte";
	import CardMeetingNotes from "./card-meeting-notes.svelte";
	import CardSmall from "./card-small.svelte";
	import CardWithImageSmall from "./card-with-image-small.svelte";
	import CardWithImage from "./card-with-image.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
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
