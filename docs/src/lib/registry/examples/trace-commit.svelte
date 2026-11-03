<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FilePenIcon from "@lucide/svelte/icons/file-pen";
	import FilePlusIcon from "@lucide/svelte/icons/file-plus";
	import GitCommitHorizontalIcon from "@lucide/svelte/icons/git-commit-horizontal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const files = [
		{
			path: "app/login/page.tsx",
			added: false,
			additions: 2,
			deletions: 2,
			diff: `@@ -14,7 +14,7 @@ export default async function LoginPage({
   searchParams,
 }) {
   const { next } = await searchParams
-  const redirectTo =
-    next && next.startsWith("/") ? next : "/"
+  const redirectTo = safeRedirect(next)
+
   return <LoginForm redirectTo={redirectTo} />
 }`,
		},
		{
			path: "lib/auth/redirect.ts",
			added: true,
			additions: 7,
			deletions: 0,
			diff: `@@ -0,0 +1,7 @@
+export function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith("/") || next.startsWith("//")) {
+    return "/"
+  }
+
+  return next
+}`,
		},
	];

	function getVariant(line: string) {
		if (line.startsWith("+")) {
			return "added";
		}

		if (line.startsWith("-")) {
			return "removed";
		}

		return "default";
	}
</script>

{#snippet diffLines(diff: string)}
	{#each diff.split("\n") as line, index (index)}
		{#if line.startsWith("@@")}
			<CodeBlock.Line class="text-muted-foreground">{line}</CodeBlock.Line>
		{:else}
			<CodeBlock.Line variant={getVariant(line)}>{line.slice(1)}</CodeBlock.Line>
		{/if}
	{/each}
{/snippet}

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<GitCommitHorizontalIcon />
				</Trace.Icon>
				<Trace.Title>Committed a1b2c3: Fix the login redirect</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each files as file (file.path)}
					<Sheet.Root>
						<Sheet.Trigger>
							<Trace.Line>
								<Trace.Icon>
									{#if file.added}
										<FilePlusIcon />
									{:else}
										<FilePenIcon />
									{/if}
								</Trace.Icon>
								<Trace.Title>
									{file.added ? "Added" : "Edited"}
									{file.path}
								</Trace.Title>
								<Trace.Description class="font-mono">
									+{file.additions} −{file.deletions}
								</Trace.Description>
								<Trace.Icon>
									<ChevronRightIcon />
								</Trace.Icon>
							</Trace.Line>
						</Sheet.Trigger>
						<Sheet.Content>
							<Sheet.Header>
								<Sheet.Title class="font-mono">{file.path}</Sheet.Title>
								<Sheet.Description>
									{file.additions} additions, {file.deletions} deletions
								</Sheet.Description>
							</Sheet.Header>
							<CodeBlock.Root class="mx-6 mb-6 w-auto">
								<CodeBlock.Content>
									{@render diffLines(file.diff)}
								</CodeBlock.Content>
							</CodeBlock.Root>
						</Sheet.Content>
					</Sheet.Root>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
