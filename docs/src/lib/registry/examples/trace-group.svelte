<script lang="ts">
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import SearchIcon from "@lucide/svelte/icons/search";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Line>
		<Trace.Icon>
			<SearchIcon />
		</Trace.Icon>
		<Trace.Title>Searched for minimumReleaseAge</Trace.Title>
	</Trace.Line>
	<Trace.Line>
		<Trace.Icon>
			<FileTextIcon />
		</Trace.Icon>
		<Trace.Title>Read pnpm-workspace.yaml</Trace.Title>
	</Trace.Line>
	<Trace.Line>
		<Trace.Icon>
			<TerminalIcon />
		</Trace.Icon>
		<Trace.Title>Ran pnpm install</Trace.Title>
	</Trace.Line>
</Trace.Root>
