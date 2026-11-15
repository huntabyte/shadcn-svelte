<script lang="ts">
	import CircleXIcon from "@lucide/svelte/icons/circle-x";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import LayersIcon from "@lucide/svelte/icons/layers";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const STACK = `TypeError: Cannot read properties of undefined (reading 'total')
    at formatInvoice (app/lib/billing.ts:42:31)
    at InvoiceRow (app/components/invoice-row.tsx:18:12)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:14985:18)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:19049:16)
    at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:22776:12)
    at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:22707:5)`;

	function parseFrame(line: string) {
		const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/);

		return {
			line,
			name: match?.[1],
			file: match?.[2],
			lineNumber: match?.[3],
			internal: line.includes("node_modules"),
		};
	}

	const [error, ...lines] = STACK.split("\n").map((line) => line.trim());
	const frames = lines.map(parseFrame);
	const appFrames = frames.filter((frame) => !frame.internal);
	const internalFrames = frames.filter((frame) => frame.internal);
</script>

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="error">
				<Trace.Icon>
					<CircleXIcon />
				</Trace.Icon>
				<Trace.Title>Failed: {error}</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="flex flex-col gap-2">
			<p class="font-mono text-xs text-destructive">{error}</p>
			<Trace.Root>
				{#each appFrames as frame, index (index)}
					<a href="#{frame.file}:{frame.lineNumber}">
						<Trace.Line>
							<Trace.Icon>
								<FileCodeIcon />
							</Trace.Icon>
							<Trace.Title>
								{frame.name} in {frame.file}:{frame.lineNumber}
							</Trace.Title>
						</Trace.Line>
					</a>
				{/each}
				<Trace.Collapsible>
					<Trace.CollapsibleTrigger>
						<Trace.Line>
							<Trace.Icon>
								<LayersIcon />
							</Trace.Icon>
							<Trace.Title>
								{internalFrames.length} framework frames
							</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent>
						<ol
							class="flex flex-col gap-1 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs"
						>
							{#each internalFrames as frame, index (index)}
								<li class="whitespace-nowrap">
									{frame.line}
								</li>
							{/each}
						</ol>
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
