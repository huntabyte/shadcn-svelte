<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	import {
		Item,
		ItemContent,
		ItemDescription,
		ItemFooter,
		ItemGroup,
	} from "$lib/registry/ui/item/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
</script>

<Card>
	<CardHeader>
		<CardTitle>Savings Targets</CardTitle>
		<CardDescription>
			Active milestones for 2024 across your portfolio. Monitor how close you are to each
			savings goal.
		</CardDescription>
	</CardHeader>
	<CardContent>
		<ItemGroup class="gap-3">
			<Item role="listitem" variant="muted" class="flex-col items-stretch">
				<ItemContent class="gap-3">
					<ItemDescription
						class="cn-font-heading text-muted-foreground text-xs font-medium tracking-wider uppercase"
					>
						Retirement
					</ItemDescription>
					<span class="text-3xl font-semibold tabular-nums"> $420,000 </span>
					<Progress value={65} aria-label="Retirement savings progress"></Progress>
				</ItemContent>
				<ItemFooter>
					<span class="text-muted-foreground text-sm"> 65% achieved </span>
					<span class="text-sm font-medium tabular-nums">$273,000</span>
				</ItemFooter>
			</Item>
			<Item role="listitem" variant="muted" class="flex-col items-stretch">
				<ItemContent class="gap-3">
					<ItemDescription
						class="cn-font-heading text-muted-foreground text-xs font-medium tracking-wider uppercase"
					>
						Real Estate
					</ItemDescription>
					<span class="text-3xl font-semibold tabular-nums"> $85,000 </span>
					<Progress value={32} aria-label="Real estate savings progress"></Progress>
				</ItemContent>
				<ItemFooter>
					<span class="text-muted-foreground text-sm"> 32% achieved </span>
					<span class="text-sm font-medium tabular-nums">$27,200</span>
				</ItemFooter>
			</Item>
		</ItemGroup>
	</CardContent>
	<CardFooter>
		<CardDescription class="text-center">
			You have not met your targets for this year.
		</CardDescription>
	</CardFooter>
</Card>
