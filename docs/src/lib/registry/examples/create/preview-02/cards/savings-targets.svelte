<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
</script>

<div class="grid grid-cols-2 gap-(--gap)">
	<Card.Root>
		<Card.Header>
			<Card.Title>Savings Targets</Card.Title>
			<Card.Description>Active milestones for 2024</Card.Description>
			<Card.Action>
				<Button variant="outline" size="sm">New Goal</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<Item.Group class="gap-3">
				<Item.Root variant="muted" class="flex-col items-stretch">
					<Item.Content class="gap-3">
						<Item.Description
							class="cn-font-heading text-muted-foreground text-xs font-medium tracking-wider uppercase"
						>
							Retirement
						</Item.Description>
						<span class="text-3xl font-semibold tabular-nums">$420,000</span>
						<Progress value={65} />
					</Item.Content>
					<Item.Footer>
						<span class="text-muted-foreground text-sm">65% achieved</span>
						<span class="text-sm font-medium tabular-nums">$273,000</span>
					</Item.Footer>
				</Item.Root>
				<Item.Root variant="muted" class="flex-col items-stretch">
					<Item.Content class="gap-3">
						<Item.Description
							class="cn-font-heading text-muted-foreground text-xs font-medium tracking-wider uppercase"
						>
							Real Estate
						</Item.Description>
						<span class="text-3xl font-semibold tabular-nums">$85,000</span>
						<Progress value={32} />
					</Item.Content>
					<Item.Footer>
						<span class="text-muted-foreground text-sm">32% achieved</span>
						<span class="text-sm font-medium tabular-nums">$27,200</span>
					</Item.Footer>
				</Item.Root>
			</Item.Group>
		</Card.Content>
		<Card.Footer>
			<Card.Description class="text-center">
				You have not met your targets for this year.
			</Card.Description>
		</Card.Footer>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Buy Investment</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-1 flex-col gap-3">
			<Field.Group class="flex-1">
				<Field.Field>
					<Field.Label for="invest-amount">Amount to Invest</Field.Label>
					<InputGroup.Root>
						<InputGroup.Addon>
							<InputGroup.Text>$</InputGroup.Text>
						</InputGroup.Addon>
						<InputGroup.Input id="invest-amount" value="1,000.00" />
					</InputGroup.Root>
				</Field.Field>
				<Field.Field>
					<Field.Label for="invest-type">Order Type</Field.Label>
					<NativeSelect.Root id="invest-type" value="market">
						<NativeSelect.Option value="market">Market Order</NativeSelect.Option>
						<NativeSelect.Option value="limit">Limit Order</NativeSelect.Option>
						<NativeSelect.Option value="stop">Stop Order</NativeSelect.Option>
					</NativeSelect.Root>
					<Field.Description>Market orders execute at the current price.</Field.Description>
				</Field.Field>
				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between">
						<span class="text-muted-foreground text-sm">Estimated Shares</span>
						<span class="text-sm font-semibold tabular-nums">1.95</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-muted-foreground text-sm">Buying Power</span>
						<span class="text-sm font-semibold tabular-nums">$12,450.00</span>
					</div>
				</div>
			</Field.Group>
		</Card.Content>
		<Card.Footer class="flex-col gap-3">
			<Button class="w-full">Review Order</Button>
			<Card.Description class="text-center">
				Trades are typically executed within minutes during market hours.
			</Card.Description>
		</Card.Footer>
	</Card.Root>
</div>
