<script lang="ts">
	import { cn } from "@/utils";
	import { mailStore } from "../store.js";
	import type { Mail } from "../data.js";
	import { Badge } from "@/registry/new-york/ui/badge";
	import { formatTimeAgo } from "../utils.js";

	export let items: Mail[];

	function get_badge_variant_from_label(label: string) {
		if (["work"].includes(label.toLowerCase())) {
			return "default";
		}

		if (["personal"].includes(label.toLowerCase())) {
			return "outline";
		}

		return "secondary";
	}
</script>

<!-- TODO: Replace with a ScrollArea component; currently the hack is to set `overflow-hidden` to the body of the doc. -->
<section id="mail-list" class="h-svh overflow-y-auto">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each items as item}
			<button
				class={cn(
					"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
					$mailStore.selected === item.id && "bg-muted"
				)}
				on:click={() => mailStore.setMail(item.id)}
			>
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="font-semibold">{item.name}</div>
							{#if !item.read}
								<span class="flex h-2 w-2 rounded-full bg-blue-600" />
							{/if}
						</div>
						<div
							class={cn(
								"ml-auto text-xs",
								$mailStore.selected === item.id
									? "text-foreground"
									: "text-muted-foreground"
							)}
						>
							{formatTimeAgo(new Date(item.date))}
						</div>
					</div>
					<div class="text-xs font-medium">{item.subject}</div>
				</div>
				<div class="line-clamp-2 text-xs text-muted-foreground">
					{item.text.substring(0, 300)}
				</div>
				{#if item.labels.length}
					<div class="flex items-center gap-2">
						{#each item.labels as label}
							<Badge variant={get_badge_variant_from_label(label)}>
								{label}
							</Badge>
						{/each}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</section>
