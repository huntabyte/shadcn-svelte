<script lang="ts">
	import AssignIssue from "./assign-issue.svelte";
	import CodespacesCard from "./codespaces-card.svelte";
	import ContributionsActivity from "./contributions-activity.svelte";
	import Contributors from "./contributors.svelte";
	import Navbar from "./navbar.svelte";
	import Profile from "./profile.svelte";
	import RepositoryToolbar from "./repository-toolbar.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<CodespacesCard />
	<AssignIssue />
	<Navbar />
	<RepositoryToolbar />
	<Profile />
	<ContributionsActivity />
	<Contributors />
</ExampleWrapper>
