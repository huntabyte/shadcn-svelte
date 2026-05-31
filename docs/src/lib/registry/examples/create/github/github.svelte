<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import CodespacesCard from "./codespaces-card.svelte";
	import AssignIssue from "./assign-issue.svelte";
	import Navbar from "./navbar.svelte";
	import RepositoryToolbar from "./repository-toolbar.svelte";
	import Profile from "./profile.svelte";
	import ContributionsActivity from "./contributions-activity.svelte";
	import Contributors from "./contributors.svelte";
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
