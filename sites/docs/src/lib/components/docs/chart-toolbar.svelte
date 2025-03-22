<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";

	let {
		name,
		status = "Not Started",
		class: className,
		description,
	}: {
		name: string;
		status:
			| "Not Started"
			| "In Progress"
			| "Close Enough"
			| "Needs Parity"
			| "Blocked (External)"
			| "Blocked (Internal)"
			| "Done";
		class?: string;
		description?: string;
	} = $props();
</script>

<div class={cn("flex items-center gap-2", className)}>
	<div
		class="text-muted-foreground flex items-center gap-1.5 pl-1 text-[13px] [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]"
	>
		<!-- <ChartTitle chart={chart} /> -->
		{name}
	</div>
	<div class="ml-auto flex items-center gap-2 [&>form]:flex">
		<!-- <BlockCopyButton
          name={chart.name}
          code={chart.code}
          class="[&_svg]-h-3 h-6 w-6 rounded-[6px] bg-transparent text-foreground shadow-none hover:bg-muted dark:text-foreground [&_svg]:w-3"
        /> -->
		<Separator orientation="vertical" class="mx-0 hidden h-4 md:flex" />
		<!-- <ChartCodeViewer chart={chart}>{children}</ChartCodeViewer> -->
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger disabled={!description}>
					{#snippet child({ props })}
						<Badge
							{...props}
							variant="outline"
							class={cn("select-none", {
								"border-fuchsia-400 bg-fuchsia-400/20 text-fuchsia-700 hover:bg-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:hover:bg-fuchsia-400/15":
									status === "Not Started",
								"border-sky-400 bg-sky-400/20 text-sky-700 hover:bg-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300 dark:hover:bg-sky-400/15":
									status === "In Progress",
								"border-amber-400 bg-amber-400/20 text-amber-700 hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/15":
									status === "Needs Parity",
								"border-rose-400 bg-rose-400/20 text-rose-700 hover:bg-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300 dark:hover:bg-rose-400/15":
									status === "Blocked (External)",
								"border-pink-400 bg-pink-400/20 text-pink-700 hover:bg-pink-400/30 dark:bg-pink-400/10 dark:text-pink-300 dark:hover:bg-pink-400/15":
									status === "Blocked (Internal)",
								"border-lime-400 bg-lime-400/20 text-lime-700 hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:hover:bg-lime-400/15":
									status === "Done" || status === "Close Enough",
							})}
						>
							{status}
						</Badge>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content class="max-w-[300px]">
					{description}
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
</div>
