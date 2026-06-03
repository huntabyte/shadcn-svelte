<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Card,
		CardAction,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	const areaPath = "M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z";
	const strokePath = "M0 52L18 40L36 46L54 70L72 50L100 49";
</script>

<Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
	<CardHeader>
		<CardTitle>Analytics</CardTitle>
		<CardDescription>
			418.2K Visitors <Badge>+10%</Badge>
		</CardDescription>
		<CardAction>
			<Button variant="outline" size="sm">View Analytics</Button>
		</CardAction>
	</CardHeader>
	<svg
		viewBox="0 0 100 86"
		preserveAspectRatio="none"
		class="text-chart-1 aspect-[1/0.35] w-full"
		role="img"
		aria-label="Visitor trend"
	>
		<path d={areaPath} fill="currentColor" opacity="0.28"></path>
		<path
			d={strokePath}
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			vector-effect="non-scaling-stroke"
		></path>
	</svg>
</Card>
