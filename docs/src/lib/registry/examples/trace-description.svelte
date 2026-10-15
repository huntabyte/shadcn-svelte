<script lang="ts">
	import FilePenIcon from "@lucide/svelte/icons/file-pen";
	import SearchIcon from "@lucide/svelte/icons/search";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Line>
		<Trace.Icon>
			<FilePenIcon />
		</Trace.Icon>
		<Trace.Title>Edited components/settings/notification-preferences-form.tsx</Trace.Title>
		<Trace.Description class="font-mono">+48 −12</Trace.Description>
	</Trace.Line>
	<Trace.Line>
		<Trace.Icon>
			<TerminalIcon />
		</Trace.Icon>
		<Trace.Title>Ran pnpm test</Trace.Title>
		<Trace.Description>14s</Trace.Description>
	</Trace.Line>
	<Trace.Line>
		<Trace.Icon>
			<SearchIcon />
		</Trace.Icon>
		<Trace.Title>Searched for useChat</Trace.Title>
		<Trace.Description>8 results</Trace.Description>
	</Trace.Line>
</Trace.Root>
