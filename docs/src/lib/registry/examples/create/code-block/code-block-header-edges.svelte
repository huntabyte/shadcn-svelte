<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const install = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;

	const source = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`;

	const titleOnly = 'console.log("title, no actions")';
</script>

<Example title="Header Edges">
	<div class="flex flex-col gap-4">
		<CodeBlock.Root>
			<CodeBlock.Header>
				<CodeBlock.Title>Title only</CodeBlock.Title>
			</CodeBlock.Header>
			<CodeBlock.Content code={titleOnly} />
		</CodeBlock.Root>
		<CodeBlock.Root>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={install} />
			</CodeBlock.Actions>
			<CodeBlock.Content code={install} />
		</CodeBlock.Root>
		<CodeBlock.Root>
			<CodeBlock.Header>
				<CodeBlock.Title>
					<IconPlaceholder
						lucide="FileCodeIcon"
						tabler="IconFileCode"
						hugeicons="CodeIcon"
						phosphor="FileCodeIcon"
						remixicon="RiFileCodeLine"
					/>
					apps/web/app/(dashboard)/settings/organizations/[organizationId]/members/invitations/page.tsx
				</CodeBlock.Title>
				<CodeBlock.Actions>
					<CodeBlock.CopyButton value={source} />
				</CodeBlock.Actions>
			</CodeBlock.Header>
			<CodeBlock.Content code={"export default function Page() {}"} />
		</CodeBlock.Root>
	</div>
</Example>
