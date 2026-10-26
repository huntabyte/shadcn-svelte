<script lang="ts">
	import * as Trace from "#lib/registry/ui/trace/index.js";
	import GitBranchIcon from "@lucide/svelte/icons/git-branch";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Line>
		<Trace.Icon>
			<GitBranchIcon />
		</Trace.Icon>
		<Trace.Title>Created branch fix/frozen-lockfile</Trace.Title>
	</Trace.Line>
</Trace.Root>
