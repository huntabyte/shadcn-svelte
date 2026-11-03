<script lang="ts">
	import IconGitBranch from "@tabler/icons-svelte/icons/git-branch";
	import IconGitFork from "@tabler/icons-svelte/icons/git-fork";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<div class="flex gap-2">
	<Button variant="outline">
		<IconGitBranch data-icon="inline-start" /> New Branch
	</Button>
	<Button variant="outline">
		Fork
		<IconGitFork data-icon="inline-end" />
	</Button>
</div>
