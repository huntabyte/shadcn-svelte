<script lang="ts">
	import { Metric } from "@/components/docs/charts";
	import * as Card from "@/registry/new-york/ui/card";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Exercise Minutes</Card.Title>
		<Card.Description
			>Your excercise minutes are ahead of where you normally are.</Card.Description
		>
	</Card.Header>
	<Card.Content class="pb-4">
		<div class="h-[200px]">
			<Metric />
		</div>
	</Card.Content>
</Card.Root>
