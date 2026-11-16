<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import WrapTextIcon from "@lucide/svelte/icons/text-wrap";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const output = `$ pnpm lint
apps/web/components/message-list.tsx
  18:22  error  'messages' is possibly 'undefined'. Add a guard before calling map  @typescript-eslint/no-unsafe-call
  42:7   warning  React Hook React.useEffect has a missing dependency: 'scrollToBottom'  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)`;

	function download(value: string, filename: string) {
		const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	}

	let wrap = $state(true);
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>
				<TerminalIcon />
				Terminal
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Wrap lines"
					aria-pressed={wrap}
					class="aria-pressed:text-foreground"
					onclick={() => (wrap = !wrap)}
				>
					<WrapTextIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Download"
					onclick={() => download(output, "lint.log")}
				>
					<DownloadIcon />
				</Button>
				<CodeBlock.CopyButton value={output} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content {wrap} code={output} />
	</CodeBlock.Root>
</div>
