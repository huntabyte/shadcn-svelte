<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import CircleDashedIcon from "@lucide/svelte/icons/circle-dashed";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import FlaskConicalIcon from "@lucide/svelte/icons/flask-conical";
	import XIcon from "@lucide/svelte/icons/x";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	type Test = {
		name: string;
		status: "passed" | "failed" | "skipped";
		error?: string;
	};

	const suites: { name: string; tests: Test[] }[] = [
		{
			name: "auth.test.ts",
			tests: [
				{ name: "logs in with valid credentials", status: "passed" },
				{ name: "rejects an invalid password", status: "passed" },
				{ name: "refreshes an expired token", status: "passed" },
			],
		},
		{
			name: "user-api.test.ts",
			tests: [
				{ name: "creates a user", status: "passed" },
				{
					name: "updates a user profile",
					status: "failed",
					error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`,
				},
				{ name: "deletes a user", status: "skipped" },
			],
		},
		{
			name: "db.test.ts",
			tests: [
				{ name: "connects to the database", status: "passed" },
				{
					name: "times out a slow query",
					status: "failed",
					error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`,
				},
			],
		},
	];

	function countTests(tests: Test[]) {
		return {
			total: tests.length,
			failed: tests.filter((test) => test.status === "failed").length,
			skipped: tests.filter((test) => test.status === "skipped").length,
		};
	}

	function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
		return [`${total} tests`, failed > 0 && `${failed} failed`, skipped > 0 && `${skipped} skipped`]
			.filter(Boolean)
			.join(", ");
	}

	const summary = countTests(suites.flatMap((suite) => suite.tests));
</script>

{#snippet testRow(test: Test)}
	{#if test.status === "failed"}
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line status="error">
					<Trace.Icon>
						<XIcon />
					</Trace.Icon>
					<Trace.Title>{test.name}</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code={test.error ?? ""} />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{:else}
		<Trace.Line>
			<Trace.Icon>
				{#if test.status === "skipped"}
					<CircleDashedIcon />
				{:else}
					<CheckIcon />
				{/if}
			</Trace.Icon>
			<Trace.Title>
				{test.status === "skipped" ? `Skipped ${test.name}` : test.name}
			</Trace.Title>
		</Trace.Line>
	{/if}
{/snippet}

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status={summary.failed > 0 ? "error" : undefined}>
				<Trace.Icon>
					<FlaskConicalIcon />
				</Trace.Icon>
				<Trace.Title>Ran {formatCounts(summary)}</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each suites as suite, suiteIndex (suiteIndex)}
					{@const counts = countTests(suite.tests)}
					<Trace.Collapsible open={counts.failed > 0}>
						<Trace.CollapsibleTrigger>
							<Trace.Line status={counts.failed > 0 ? "error" : undefined}>
								<Trace.Icon>
									<FileCodeIcon />
								</Trace.Icon>
								<Trace.Title>
									{suite.name}, {formatCounts(counts)}
								</Trace.Title>
							</Trace.Line>
						</Trace.CollapsibleTrigger>
						<Trace.CollapsibleContent>
							<Trace.Root>
								{#each suite.tests as test, testIndex (testIndex)}
									{@render testRow(test)}
								{/each}
							</Trace.Root>
						</Trace.CollapsibleContent>
					</Trace.Collapsible>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
